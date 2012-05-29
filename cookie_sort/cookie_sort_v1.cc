/*
 * From the book "Beauty of Programming": 
 *    There is a stack of cookie which's size are different. 
 *    And you can only reverse top n cookies to re-order the stack.
 *    Here is the solution:
 *      1. swap the biggest one of n to top
 *      2. swap the previous biggest one to bottom
 *      3. repeat step 1,2 in n-1, n-2 ....   
 */

#include <iostream>

using namespace std;

bool sort_done (int *cookie_stack, int len)
{
    for (int  i = 1; i < len; i++)
        if (cookie_stack[i - 1] > cookie_stack[i])
            return false;
    return true;
}

void swap_cookie(int *cookie, int start, int end)
{
    int tmp;

    for (int i = start, j = end; j > 0 && i < j; i++ , j--) {
        tmp = cookie[i];
        cookie[i] = cookie[j];
        cookie[j] = tmp;
    }
}

int find_biggest(int *cookie, int start, int end)
{
    int biggest_pos = start;

    for (int i = start + 1; i <= end; i++) {
        if (cookie[biggest_pos] < cookie[i])
			biggest_pos = i;
    }
    
    return biggest_pos; 
}

int run_sort (int *cookie, int bottom)
{
    if (bottom == 0) {
        return 0;
    }
    else {
        int biggest_pos = find_biggest (cookie, 0, bottom);
        swap_cookie(cookie, 0, biggest_pos); // swap the biggest to top
        swap_cookie(cookie, 0, bottom);      // swap the biggest to bottom
        cout << "swap biggest: " << biggest_pos << " to bottom" << endl;
        if (!sort_done(cookie, bottom))
            run_sort(cookie, bottom-1);
    }

    return 1;
}

int main(int argc, char* argv[])
{
//  int  cookie[7] = {4,6,5,7,3,2,1};
    int  cookie[7] = {7,6,5,9,3,8,1};
    int  len = sizeof(cookie)/sizeof(int);

    run_sort (cookie, len - 1);

    for (int i = 0; i < len; i++)
        cout << cookie[i]  <<" ";

    cout << endl;

    return 0;
}
