#include <iostream>
#include <queue>
#include <semaphore.h>
#include <pthread.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>

using namespace std;

#define MAX_QUEUE_LENGTH (5)
#define EXTRACT_SHARED_DATA \
    shared_data_t *pSharedData = (shared_data_t *) pArg; \
    queue<char> *pQueue     = pSharedData->pQueue;\
    sem_t *pReadSem         = pSharedData->pReadSem; \
    sem_t *pWriteSem        = pSharedData->pWriteSem; \
    pthread_mutex_t *pMutex = pSharedData->pMutex; \

struct shared_data_t
{
    queue<char> *pQueue;
    sem_t *pReadSem;
    sem_t *pWriteSem;
    pthread_mutex_t *pMutex;
};

void* producer_thread(void *pArg)
{
    EXTRACT_SHARED_DATA
    char data = 'a';

    while(data <= 'z')
    {
        if(sem_trywait(pWriteSem) != 0)
        {
            cerr << "Producer: buffer full and wait..." << endl;
            sem_wait(pWriteSem);
	    }

        pthread_mutex_lock(pMutex);    
        pQueue->push(data); 
        pthread_mutex_unlock(pMutex);    

        sem_post(pReadSem);
        cerr << "Producer: pushed data: " << data << endl;
        cerr.flush();
        data++;
        sleep(7);
    }

    cerr << "Producer: finished the work " << endl;
    return NULL;
}

void* consumer_thread(void *pArg)
{
    EXTRACT_SHARED_DATA
    char data = '\0';

    do{ 
        if(sem_trywait(pReadSem) != 0)
        {
            cerr << "Consumer: buffer empty and wait..." << endl;
            sem_wait(pReadSem);
        }

        pthread_mutex_lock(pMutex);    
        data = pQueue->front(); 
        pQueue->pop();
        pthread_mutex_unlock(pMutex);    

        sem_post(pWriteSem);
        cerr << "Consumer: got data: " << data << endl;
        cerr.flush();
        sleep(1);
    } while(data != 'z');

    cerr << "Consumer: finished the work " << endl;
    return NULL;
}
  
int main()
{
    queue<char> myQueue;
    pthread_mutex_t csMutex; 
    sem_t semRead;
    sem_t semWrite;
    shared_data_t sharedData;

    pthread_mutex_init(&csMutex, NULL);
    sem_init(&semRead, 0, 0);
    sem_init(&semWrite, 0, MAX_QUEUE_LENGTH);
    
    memset(&sharedData, 0, sizeof(sharedData));
    sharedData.pQueue    = &myQueue;
    sharedData.pReadSem  = &semRead;
    sharedData.pWriteSem = &semWrite;
    sharedData.pMutex    = &csMutex;

    pthread_t producer_tid;
    pthread_create(&producer_tid, NULL, producer_thread, &sharedData);

    // delay to run consumer thread
    sleep(1);

    pthread_t consumer_tid;
    pthread_create(&consumer_tid, NULL, consumer_thread, &sharedData);

    pthread_join(producer_tid, NULL); 
    pthread_join(consumer_tid, NULL); 

    return 0;
}
