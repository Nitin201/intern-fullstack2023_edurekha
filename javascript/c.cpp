// C++ implementation
#include <bits/stdc++.h>
using namespace std;

// function to return the count
int count_greater(int arr[], int n)
{
	int min = INT_MAX;
	int counter = 0;

	// Comparing the given element
	// with minimum element till
	// occurred till now.
	for (int i = n - 1; i >= 0; i--) {
		if (arr[i] > min) {
			counter++;
		}

		// Updating the min variable
		if (arr[i] <= min) {
			min = arr[i];
		}
	}

	return counter;
}

// Driver code
int main()
{
	int arr[] = { 3, 2, 1, 2, 3, 4, 5 };
	int n = sizeof(arr) / sizeof(int);

	cout << count_greater(arr, n) << endl;

	return 0;
}
