#include <iostream>
#include "Stack.h"
#include <Tchar.h>
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

#if 1
#include <string>
int main()
{

   // string sFirstName = "Neo";
   // string sLastName  = "Yang";  
    string sFullName = "Neo" + "Yang";

    cout << "My name: " << sFullName << endl;

    sFullName.clear();
    sFullName.append("Neo");
    sFullName.append("Yang");

    cout << "My name: " << sFullName << endl;

    //sFullName.


    int i;
    cin  >> i ;
    return 0;
}
#else
int main()
{
#if 0
    TCHAR *cc = new TCHAR[10];
    //memset(cc, 0, sizeof(TCHAR)*10);
    TCHAR *dd = _T("hello");
    _tcscpy(cc, dd);
   
   // memset(cc, 0, sizeof(TCHAR));

    cout << "size of TCHAR : " << sizeof(TCHAR) << endl;
    cout << " TCHAR  string: " << cc << endl;

    if (cc[0] == _T('\0'))
        cout << "The string is empty" << endl;
    else
        cout << "The string is not empty" << endl;

    cout << "strlen of cc: " << _tcsclen(cc) << endl;

    if(checkBrace())
        cout << "check brace ok" << endl;
    else
        cout << "check brace failed" << endl;
#endif

    wchar_t *wchar2 = L"ÖÐÎÄ";

    wcout << "wchar :" << wchar2 << endl;
//#ifdef _WIN32
    int i;
    cin >> i;
//#endif
}
#endif