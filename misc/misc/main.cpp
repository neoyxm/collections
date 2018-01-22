#include <iostream>
#include <cstring>
#include <cstdio>

using namespace std;

class CMyString{
public:
    CMyString() : m_str(NULL) {}
    CMyString(const char *s);
    //CMyString(const string &s);
    void print() { cout << m_str << endl; }

    CMyString &operator= (const  CMyString &s);
private:
    char *m_str;
};

CMyString::CMyString(const char *s)
{
    if (!s) return;

    int nLen = strlen(s);

    m_str = new char[nLen + 1];

    sprintf(m_str, "%s", s);
}

CMyString& CMyString::operator=(const  CMyString &s)
{
    if (this == &s)
       return *this;

    if (m_str)
        delete[] m_str;

    int nLen = strlen(s.m_str);
    m_str = new char[nLen + 1];
    sprintf(m_str, "%s", s.m_str);

    return *this;
}

int main()
{
    CMyString  s1("Hello");
    CMyString  s2;

    s2 = s1;

    s2.print();

    int i;
    cin >> i;
}




