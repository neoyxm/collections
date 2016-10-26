#include <iostream>
#include "Stack.h"
using namespace std;

bool isPeer(char c, char b)
{
    switch (c)
    {
        case '(':
            if (b == ')')
                return true;
        case '[':
            if (b == ']')
                return true;
        case '{':
            if (b == '}')
                return true;
    }
    return false;
}

int checkBrace()
{
    Stack s = NULL;
    s = createStack(10);
    char c = ' ';
    while (cin >> c)
    {
        if (isEmpty(s))
            push(s, c);
        else
        {
            char b = ' '; 
            top(s, b);
            if (isPeer(b, c))
                pop(s, b);
            else
                push(s, c);
        }
    }
    
    return isEmpty(s);
}

int main()
{
    if(checkBrace())
        cout << "check brace ok" << endl;
    else
        cout << "check brace failed" << endl;
//#ifdef _WIN32
    int i;
    cin >> i;
//#endif
}