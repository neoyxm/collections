#include <iostream>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#include "common.h"

using namespace std;


#define MAX_NUMBER     (10000000)
#define MAX_DUP_NUMBER (0x0a)  // max 10 duplicated number
#define SHIFT_UNIT     (4)     // very counter uses 0.5 byte
#define UNIT_SIZE      (sizeof(int)*2)
#define VECTOR_SIZE    (MAX_NUMBER/2/sizeof(int) + 1)


#define GET_COUNTER(n, offset) ((n >> offset*SHIFT_UNIT) & 0x0f)
#define ADD_COUNTER(n, offset) (((GET_COUNTER(n, offset) + 0x01)<< offset*SHIFT_UNIT) | (n&~(0x0f << offset*SHIFT_UNIT)))

void set_bit(int *vector, int vector_len, int pos)
{
    int vector_pos     = pos / UNIT_SIZE;
    int vector_offset  = pos % UNIT_SIZE;

    vector[vector_pos] = ADD_COUNTER(vector[vector_pos], vector_offset);
}

void output_sort (int *vector, int vector_len)
{
    for (int i = 0; i < vector_len; i++) {
        for (int offset = 0; offset < UNIT_SIZE; offset++) {
            for (char dup = 0x0; dup < GET_COUNTER(vector[i], offset); dup++) {
                cout << i*UNIT_SIZE + offset << ", ";
            }
        }
    }
    cout << endl;
}

int main()
{
    int input = -1;
    int *vector = new int[VECTOR_SIZE];
    int vector_len = VECTOR_SIZE;

    memset(vector, 0x0, VECTOR_SIZE*sizeof(int));

    do {
        cin >> input;
        if (input >= 0 && input <= MAX_NUMBER)
            set_bit(vector, vector_len, input);
    } while (input > 0);

    output_sort (vector, vector_len);

    quit();

    return 0;
}
