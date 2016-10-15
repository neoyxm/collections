#include <iostream>
#include <stdlib.h>

using namespace std;

#define N (10)

int bi_search(int *pData, int n, int target)
{
    int low  = 0;
    int high = n-1;

    while (low <= high)
    {
        int mid =  (low + high) / 2;

        if (target < pData[mid]) 
        {
            high =  mid - 1;   
        }  
        else if (target > pData[mid])
        {
            low =  mid + 1;   
        }
        else
            return mid;
    }
    return -1;	
}

#define UNIT_TEST(target, expect) while(1){\
int ret = bi_search(data, N, target) ;\
if(expect == ret)\
cout << "search :" << target << " return: " << ret << " passed\n";\
else \
cout << "search :" << target << " return: " << ret << ", expect:" << expect<<" failed\n";\
break;}\

int main()
{
    int data[N] = {3,4,6,10, 15, 17, 20,24,46, 50};

    UNIT_TEST(3, 0);
    UNIT_TEST(4, 1);
    UNIT_TEST(6, 2);
    UNIT_TEST(10, 3);
    UNIT_TEST(15, 4);
    UNIT_TEST(17, 5);
    UNIT_TEST(4, 1);
    UNIT_TEST(46, 8);
    UNIT_TEST(50, 9);
    UNIT_TEST(100, -1);

    return 0;
}
