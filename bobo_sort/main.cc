#include <iostream>

using namespace std;

int bobo_sort(int *pData, int nLen)
{
	if (!pData) return 1;	

	for (int i = 0; i < nLen - 1; i++)
		for (int j = 0; j < nLen - i - 1; j++)
			if(pData[j] > pData[nLen - i - 1])
			{
				int  tmp = pData[j];
				pData[j] = pData[nLen - i - 1];
				pData[nLen - i - 1] = tmp;
			}
	
	return 0;
}

void print_data(int *pData, int nLen)
{
	if (!pData) return;	

	for (int i = 0; i < nLen; i++)
		cout << pData[i]  << " ";
}

int main()
{
	int data[] = {10,2,7,9,20,15,99,50,32};	
//	int data[] ={10};
	//int data[] ={};
	int length = sizeof(data)/sizeof(int);

	
	cout << "Original data order:" ;
	print_data(data, length);
	cout << endl;

	bobo_sort(data, length);
	
	cout << "Sorted data order:" ;
	print_data(data, length);
	cout << endl;



	return 0;
}
