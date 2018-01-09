#include <iostream>

using namespace std;

#define UNIT_TEST(idx, a, b, len)    while(1){         \
    bool bPass = true;                                  \
    for(int i = 0; i < len; i++)                        \
    {                                                   \
        if(a[i] != b[i])                                \
        {                                               \
           bPass = false;                              \
           cout << "Case: "<< idx << " failed" << endl; \
           break;                                       \
        }                                               \
    }                                                   \
                                                        \
    if (bPass)                                          \
        cout << "Case: " << idx << " passed" << endl;   \
                                                        \
    break;                                               \
}                        \

#define UNIT_PRINT(s, a) while(1) {  break; }


void shell_sort(int *const pData, const int nLen)
{
    for (int step = nLen/2; step > 0; step--)
    {
        for (int i = step; i < nLen; i++)
        {
            for (int k = i; k > 0 && pData[k - step] > pData[k]; k -= step)
            {
                swap(pData[k - step] , pData[k]);
            }
        }
    }
}

int main()
{
{
    int sampleData[] = {23, 0, 2, -1, 19, 17, 20};
    int sampleLen = sizeof(sampleData) / sizeof(int);

    shell_sort(sampleData, sampleLen);
    
    int resultData[] = { -1, 0, 2, 17, 19, 20, 23 };
    UNIT_TEST(1, resultData, sampleData, sampleLen);
}

{
    int sampleData[] = { 1 };
    int sampleLen = sizeof(sampleData) / sizeof(int);

    shell_sort(sampleData, sampleLen);

    int resultData[] = { 1 };
    UNIT_TEST(2, resultData, sampleData, sampleLen);
}

{
    int sampleData[] = { 3,2 };
    int sampleLen = sizeof(sampleData) / sizeof(int);

    shell_sort(sampleData, sampleLen);

    int resultData[] = { 2,3 };
    UNIT_TEST(3, resultData, sampleData, sampleLen);
}

    int i;
    cin >> i;
    return 0;
}