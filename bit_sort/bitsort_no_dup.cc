#include <iostream>
#include <stdlib.h>
#include <string.h>

#include "common.h" 

using namespace std;

#define MAX_NUMBER (10000000)
#define UNIT_SIZE  (sizeof(int) * 8)

void set_bit(int *vector, int vector_len, int pos)
{
    int vector_pos     = pos / UNIT_SIZE;
    int vector_offset  = pos % UNIT_SIZE;

    vector[vector_pos] |= (0x01 << vector_offset);
}

void output_sort (int *vector, int vector_len)
{
    for (int i = 0; i < vector_len; i++)
        for (int offset = 0; offset < UNIT_SIZE; offset++) {
            if (vector[i] & (0x01 << offset))
                cout << i*UNIT_SIZE + offset << ", ";
        }
     cout << endl;
}

int main()
{
    int input = -1;
    int *vector = new int[MAX_NUMBER / UNIT_SIZE  + 1];
    int vector_len = MAX_NUMBER / UNIT_SIZE  + 1;

	memset(vector, 0x0, vector_len*sizeof(int));

    do {
       cin >> input;
       if (input >= 0 && input <= MAX_NUMBER)
           set_bit(vector, vector_len, input);   
    } while (input > 0);
    
    output_sort (vector, vector_len);

	delete [] vector;

    quit();

    return 0;
}
