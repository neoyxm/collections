#include <iostream>
#include <string.h>
#include <stdlib.h>

using namespace std;


int reverse(char *pStr, int nStart, int nEnd, int nStrlen)
{
	if (!pStr || nStrlen <= 0 || nStart > nEnd || nEnd+1 > nStrlen)
		return -1;

	char *pHeader = pStr+nStart;
	char *pTail   = pStr+nEnd;

	while (pHeader < pTail)
	{
		char tmp = *pHeader;
		*pHeader = *pTail;
		*pTail = tmp;

		pHeader ++;
		pTail --;
	}

	return 0;
}

int main(int argc, char **argv)
{
	if (argc < 3)
	{
		cout << "Usage: reverse str pos" << endl;
		exit(1);
	}	

	char str[256] = {0};
	int  pos = atoi(argv[2]) - 1;

	strncpy(str, argv[1], strlen(argv[1]));
	
	cout << "origianl: " << str << endl;

	reverse(str, 0, pos-1, strlen(str));
	reverse(str, pos, strlen(str)-1, strlen(str));
	reverse(str, 0, strlen(str)-1, strlen(str));

	cout << "result: " << str << endl;

#ifdef _WIN32
	char c = getchar();
#endif
	return 0;
}
