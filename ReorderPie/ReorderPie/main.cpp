//
//  main.cpp
//  ReorderPie
//
//  Created by YangNeo on 12/10/2016.
//  Copyright © 2016 YangNeo. All rights reserved.
//

#include <iostream>
using namespace  std;

struct Pie {
    int m_No;
    int m_Size;
};

int reversePies(Pie *pPieList,  int size)
{
    for(int i = 0; i < size/2; i++)
    {
        Pie tmp;
        
        tmp = pPieList[i];
        pPieList[i] = pPieList[size-1-i];
        pPieList[size-1-i] =tmp;
    }
    
    return 0;
}

int reOrderPies(Pie *pPieList,  int size)
{
    if (size == 1)
        return 0;
    
    //search the biggest pie in th stack
    int biggest = 0;
    for(int i = biggest + 1; i < size; i++)
    {
        if (pPieList[i].m_Size >= pPieList[biggest].m_Size)
            biggest = i;
    }
    
    if (biggest == size - 1)
        reOrderPies(pPieList,  size - 1);
    
    reversePies(pPieList, biggest+1);
    reversePies(pPieList, size);
    
    reOrderPies(pPieList,  size - 1);

    return 0;
}

void printPies(Pie *pPieList,  int size)
{
    for(int i = 0;  i < size; i++)
        cout<< pPieList[i].m_No << "\t" << pPieList[i].m_Size << endl;
}

int main(int argc, const char * argv[]) {
    
    Pie pieArray[8] = {
        {3, 7},       //         ********
        {4, 3},       //           ***
        {1, 10},      //        **********
        {5, 4},       //           ****
        {2, 8},       //         ********
        {7, 3},       //           ***
        {6, 10},      //        **********
        {8, 10}};      //          *****
    
    reOrderPies(pieArray, sizeof(pieArray)/sizeof(Pie));
    
    printPies(pieArray, sizeof(pieArray)/sizeof(Pie));
    
    return 0;
}
