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
#include <stdio.h>

using namespace std;

bool sort_done (int *cookie_stack, int len)
{
    for (int  i = 0; i < len; i++)
        if (i + 1 < len && cookie_stack[i] > cookie_stack[i+1])
            return false;
    return true;
}

void swap_cookie(int *cookie, int start, int end)
{
    int tmp, i;
   
    if (end <= start) return;

    for (i = start; i <= end/2; i++) {
        tmp = cookie[i];
        cookie[i] = cookie[end - i];
        cookie[end - i] = tmp;
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

int run_sort (int *cookie, int bottom, int step)
{
//    printf("cookie:%p, bottom:%d\n", cookie, bottom);
    //for (int i = 0; i < bottom + 1; i++)
    //    cout << cookie[i]  <<" ";
    //cout << endl;

    if (step > 2*(bottom+1))
        return 0;

    if (sort_done(cookie, bottom + 1))
    {
#if 0
	if (step < 2*(bottom+1))
        {
            for (int i = 0; i < bottom + 1; i++)
                cout << cookie[i]  <<" ";
            cout << endl;
        }
#endif
        return 0;
    }

    for (int i = 1; i <= bottom; i++) {
        swap_cookie(cookie, 0, i); 
        run_sort(cookie, bottom, step+1); 
        swap_cookie(cookie, 0, i); 
    }
    return 0;
}

int main(int argc, char* argv[])
{
    int  cookie[7] = {4,8,6,1,3,2,0};
//    int  cookie[7] = {7,6,5,4,3,2,1};
    int  len = sizeof(cookie)/sizeof(int);

    run_sort (cookie, len - 1, 0);

    for (int i = 0; i < len; i++)
        cout << cookie[i]  <<" ";

    cout << endl;

    return 0;
}
