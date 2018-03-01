#include <iostream>
#include <cstring>
#include <string>
#include <vector>
#include <stack>
#include <list>
#include <cstdio>
#include <algorithm>
using namespace std;

class CMyString{
public:
    CMyString() = default;
    CMyString(const char *s);
    //CMyString(const string &s);
    void print() { cout << m_str << endl; }

    CMyString &operator= (const  CMyString &s);
private:
    char *m_str = "haha";
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

int fab(int n)
{
    if (0 == n)
       return 0;
    if (1 == n)
       return 1;

    return fab(n - 2) + fab(n-1);
}

class CBase{
public:
    virtual void f() { cout << "Base f()" << endl; }
};

class CDiver :public CBase{
public:
    void f() { cout << "CDiver f()" << endl; }
};

class CDiver2 :public CDiver{
public:
    void f() { cout << "CDiver2 f()" << endl; }
};

void print_class(CBase &obj)
{
    obj.f();
}

const vector<string>::iterator find_it_by_name(vector<string> &a, const string &name)
{
    vector<string>::iterator it = a.begin();
    for (; it != a.end(); it++)
    {
        if (*it == name)
            break;
    }
    
    return it;
}

void travel_list()
{
	list<int> a = {0, 1, 2, 3, 4};
	//list<int>::iterator begin = a.begin(), end = a.end();

	for (list<int>::iterator begin = a.begin(); begin != a.end(); begin++)
	{
		cout << *begin << " ";
	}   

	cout << endl;
}

bool myCompare(string& s1,  string& s2)
{
    if(s1.size() > s2.size())    
        return true;
    return false;
}

bool mySplit(string& s)
{
    if(s.size() > 5)
        return true;
    return false;
}

int main()
{
    CMyString  s1(NULL);
    auto & s2 = s1;

    s2.print();

    cout << "fab(16) = " << fab(16) << endl;

    CBase objBase;
    CDiver objDiver;
    CDiver2 objDiver2;

    print_class(objBase);
    print_class(objDiver);
    print_class(objDiver2);

    vector<string> a = {"Neo", "Meggie", "Lily"};

    vector<string>::iterator it = find_it_by_name(a, "Lily");

    vector<string> b(a.begin(), it);

    for (vector<string>::iterator it = b.begin(); it != b.end(); it++ )
    {
        cout << "Name:" << *it << endl;
    }

    cout   << endl;

    a.swap(b);

    for (vector<string>::iterator it = b.begin(); it != b.end(); it++)
    {
        cout << "Name:" << *it << endl;
    }

	travel_list();


	string s("hello");
	s.replace(2, 5, "ooooo");
	cout << s << endl;

	string number("0123456789");
	string name("2z3j5");
	string::size_type pos = 0;
	while ((pos = name.find_first_of(number, pos)) != string::npos)
	{
		cout << "found number at index:" << pos << "element is:" << name[pos] << endl;
		pos++;
	}

	vector<int> avec { 1,2,3 };

	for (auto cit = avec.cbegin(); cit != avec.cend(); cit++)
	{
		cout << *cit << endl;
	}

	stack<int, vector<int> > stack_vec(avec);
	stack_vec.push(4);


    vector<string> strvec = {"AAAA", "BBBBB", "CCCCCC", "DD", "EEEEEEEEEEEE", "F"};
   // sort(strvec.begin(), strvec.end(), myCompare);
    for(const auto &s : strvec)
        cout << s << " ";
    cout << endl;

    auto point = partition(strvec.begin(), strvec.end(), [](const string& s1){ return s1.size() > 5;});
    for(auto iter = strvec.begin();iter != point; iter++)
        cout << *iter << " ";
    cout << endl;

    //lambda
    int (*f)(int) = [](int a) { return a;};
    cout << "f:" << f(10) <<endl;  


#ifdef __WIN32__
    int i;
    cin >> i;
#endif
    
    return 0;
}




