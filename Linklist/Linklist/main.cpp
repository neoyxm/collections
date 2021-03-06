
#include "Linklist.h"
#include <iostream>
using namespace std;

void InsertSort(LinklistImpl *pLinklistImpl, ElementType e)
{
    Position p = pLinklistImpl->L;

    while (p)
    {
        if (p->next)
        {
            if (e <= p->next->data)
            {
                Insert(pLinklistImpl, e, p);
                break;
            }   
        }
        else
        {
            Insert(pLinklistImpl, e, p);
            break;
        }
        p = p->next;
    }
}

int main()
{
     LinklistImpl objLinklist = {0};

     MakeEmpty(&objLinklist);

     InsertSort(&objLinklist, 4);
     InsertSort(&objLinklist, 2);
     InsertSort(&objLinklist, 3);
     InsertSort(&objLinklist, 1);

     Add(&objLinklist, 11);
     Add(&objLinklist, 9);
     Add(&objLinklist, 8);
     Add(&objLinklist, 12);

     Delete(&objLinklist, 12);
     Delete(&objLinklist, 8);

     PrintLinklist(&objLinklist);

     cout << "start to empty the list" << endl;
     Empty(&objLinklist);
     PrintLinklist(&objLinklist);
     cout << endl;
     cout << "after empty the list and you should see nothing above" << endl;

#ifdef _WIN32
    int i;
    cin >> i;
#endif
    return 0;    
}
