#include <stdio.h>
#include <string.h>
#include "utils.h"

int set_hex(char *in, unsigned char *out, int size)
{
    int i,n;
    unsigned char j;

    n=strlen(in);
    if (n > (size*2))
    {
        printf("hex string is too long\n");
        return(0);
    }

    memset(out,0,size);
    for (i=0; i<n; i++)
    {
        j=(unsigned char)*in;
        *(in++)='\0';
        if (j == 0) break;
        if ((j >= '0') && (j <= '9'))
            j-='0';
        else if ((j >= 'A') && (j <= 'F'))
            j=j-'A'+10;
        else if ((j >= 'a') && (j <= 'f'))
            j=j-'a'+10;
        else {
            printf("non-hex digit\n");
            return(0);
        }

        if (i&1)
            out[i/2]|=j;
        else
            out[i/2]=(j<<4);
    }

    return(1);
}

void dump_hex(unsigned char *in, int size)
{
    unsigned char *p = in;
    int n = 0;

    printf("\n===============Hex Dump: %p =================\n", in);
    while(n < size && p) {
        printf("0x%02x ", p[n]);
        n++;

        if ((n)%11 == 0) printf("\n");
    }
    printf("\n===============Hex Dump end =========================\n");
}
