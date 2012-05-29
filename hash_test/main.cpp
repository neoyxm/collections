#include <iostream>
#include <stdio.h>

using namespace std;

int hash_c2i(char c)
{
    if (c >= 'a' && c <= 'z')
		return (c - 'a');

	return  -1;
}

int main()
{
	char c = 0;
	int char_pool[26] = {0}; 

	do {
	   cin  >> c;
	   int idx = hash_c2i(c);
	   if (idx >= 0)
           char_pool[idx]++;
	} while (c != '0');

	for (int  i = 0; i < sizeof(char_pool)/sizeof(int); i++)
		for (int  j = 0; j < char_pool[i]; j++)
			printf("%c ",  'a' + i);
	
	//cout << endl;

	cin >> c;

    return 0;
}