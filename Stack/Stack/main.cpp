#include <iostream>
#include "Stack.h"
using namespace std;

int main()
{
    Stack s = createStack(5);
    
    int e = 0;
    while (cin>>e)
    {
        if(push(s, e) < 0)
            cerr << "failed to push " << e << " to stack\n"; 
    }

    while (pop(s, e) ==0)
        cout << "pop:  " << e << endl;

    destroyStack(s);
    s = NULL;

//#ifdef _WIN32
    int i;
    cin >> i;
//#endif
}