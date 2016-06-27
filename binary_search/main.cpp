#include <iostream>
#include <stdlib.h>

using namespace std;

const int data[] = {12, 14, 20, 23, 25,
                    26, 31, 32, 36, 39,
                    40, 43, 46, 48, 51
                   };

void print_usage(int argc, char **argv)
{
    if (argc < 2)
    {
        cout << "Usage: " << argv[0] << " target_num." << endl;
        exit(1);
    }
}

int binary_search (int start_pos, int end_pos, int target)
{
    if (start_pos == end_pos)
    {
        if (data[start_pos] == target)
            return start_pos;
        else
            return -1;
    } else {
        int half_pos =  (start_pos + end_pos) >> 1;

        if (data[half_pos] == target)
            return half_pos;
        else if (data[half_pos] < target && end_pos > half_pos)
            return binary_search(half_pos + 1, end_pos, target);
        else if (data[half_pos] > target && half_pos > start_pos)
            return binary_search(start_pos, half_pos -1, target);
        else
            return -1;
    }

    return -1;
}

int binary_search_non_recursive(int start_pos, int end_pos, int target)
{
    int target_pos  = -1;
    int s = start_pos, e = end_pos;

    while ( s <= e)
    {
        int half_pos  =  (s + e) >> 1;

        if (data[half_pos] == target)
        {
            target_pos = half_pos;
            break;
        }
        else if (data[half_pos] < target && e > half_pos)
        {
            s = half_pos + 1;
            continue;
        }
        else if (data[half_pos] > target && half_pos > s)
        {
            e = half_pos - 1;
            continue;
        }
        else
            break;
    }

    return target_pos;
}

int main(int argc, char **argv)
{

    int target = 0;

    for (int i = 0; i < sizeof(data)/sizeof(int); i++)
    {
        cout << data[i] << " ";
    }
    cout << endl;


    cout << "Please input you want:";
    cin >> target;
    cout << endl;

    cout << "Recursive: The target: " << target;
    cout << " at index: "  << binary_search(0, sizeof(data)/sizeof(int) - 1, target);
    cout << endl;

    cout << "Non-Recursive: The target: " << target;
    cout << " at index: "  << binary_search_non_recursive(0, sizeof(data)/sizeof(int) - 1, target);
    cout << endl;

#ifdef __WIN32__
    {
        char c = 0;
        cin >> c;
    }
#endif

    return 0;
}
