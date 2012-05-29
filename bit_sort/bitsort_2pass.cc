#include <iostream>
#include <stdlib.h>
#include <string.h>

#include "common.h" 

using namespace std;

#define MAX_NUMBER (32)
#define UNIT_SIZE  (sizeof(int) * 8)

static int sample_data[35] = { 34,33,4,20,9,10,27,4,31,5,7,8,14,0,13, 34,12,4,20,9,10,27,4,31,5,7,8,14,0,13, 27,1,16,34,32}; 

void set_bit(int *vector, int vector_len, int pos)
{
    int vector_pos     = pos / UNIT_SIZE;
    int vector_offset  = pos % UNIT_SIZE;

    vector[vector_pos] |= (0x01 << vector_offset);
}

void output_sort (int *vector, int vector_len, int base)
{
    for (int i = 0; i < vector_len; i++)
        for (int offset = 0; offset < UNIT_SIZE; offset++) {
            if (vector[i] & (0x01 << offset))
                cout << base + i*UNIT_SIZE + offset << ", ";
        }
     cout << endl;
}

int main()
{
    int vector [MAX_NUMBER / UNIT_SIZE  + 1] = {0x0};
    int vector_len = sizeof(vector) / sizeof(int);

    int sample_len = sizeof(sample_data)/ sizeof(int);

    for (int i = 0; i < (sample_len/MAX_NUMBER + 1); i++) {
        int base = i * MAX_NUMBER;
        cout << "set base to : " << base << endl;
        for (int j = 0; j < sample_len; j++) {
            if (sample_data[j] >= base && sample_data[j] < base + MAX_NUMBER) 
                set_bit(vector, vector_len, sample_data[j]- base);
        }
        output_sort(vector, vector_len, base);
        memset(vector, 0x00, sizeof(vector));
    }

    quit();
    return 0;
}
