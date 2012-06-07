#include <iostream>

using namespace std;

typedef int (*f_sort)(int *, int);

void swap(int *pD1, int *pD2)
{
	int tmp = *pD1;
	*pD1 =  *pD2;
	*pD2 =  tmp;
}

int bobo_sort(int *pData, int nLen)
{
	if (!pData) return 1;	

	for (int i = 0; i < nLen - 1; i++)
		for (int j = 0; j < nLen - i - 1; j++)
			if(pData[j] > pData[nLen - i - 1])
			{
				swap(&pData[j], &pData[nLen - i - 1]);
			}
	
	return 0;
}

int bobo_recusive_sort(int *pData, int nLen)
{
	if (!pData || nLen <= 1) return 0;

	for (int i = 0; i < nLen - 1; i ++)
	{
		if (pData[i] > pData[nLen - 1])	
			swap(&pData[i], &pData[nLen - 1]);
	}

	bobo_recusive_sort(pData, nLen - 1);

	return 0;
}

void print_data(int *pData, int nLen)
{
	if (!pData) return;	

	for (int i = 0; i < nLen; i++)
		cout << pData[i]  << " ";
}

int test_framework(f_sort pSortFunc, int *pData, int nLen)
{
	cout << "Original data order:" ;
	print_data(pData, nLen);
	cout << endl;

	if (pSortFunc(pData, nLen) != 0)
	{
		cerr << "Sort failed" << endl;
		return 1;
	}

	cout << "Sorted data order:" ;
	print_data(pData, nLen);
	cout << endl;

	return 0;
}

int main()
{
	int data[] = {10,2,7,9,20,15,99,50,32};	
	int data2[] = {10,2,7,9,20,15,99,50,32};	
	//int data[] ={10};
	//int data[] ={};
	//int  *data = NULL;
	int length = sizeof(data)/sizeof(int);

	cout << "Loop version for Bobo sort:" << endl;
	test_framework(bobo_sort, data, length);

	cout << endl;
	
	length = sizeof(data2)/sizeof(int);
	cout << "Recursive version for Bobo sort:" << endl;
	test_framework(bobo_recusive_sort, data2, length);

	return 0;
}
