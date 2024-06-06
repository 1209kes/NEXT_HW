print("1부터 100까지의 숫자를 하나 생각하세요.")
print("생각한 숫자를 입력하세요.")
num=int(input())

print("당신이 생각한 숫자는 50 입니까?")
print("제가 제시한 숫자보다 크다면 '큼', 작다면 '작음'을 입력해주세요")
ls=input()

arr = list(range(1,101))
target = num
def binary_search(arr, target) :
    left=0
    right=len(arr)-1
    while left <= right:
        mid = (left+right) // 2
        if arr[mid] == target:
            print("당신이 생각한 숫자는", target, "입니다.")
            print("GAME OVER")
            break
        elif arr[mid] < target:
            print("당신이 생각한 숫자는", left, "입니까?")
            print("제가 제시한 숫자보다 크다면 '큼', 작다면 '작음'을 입력해주세요")
            ls=input()
            left= mid +1
        else:
            right = mid -1
if ls == '큼' or ls=='작음':
    binary_search(arr, target)
    

            
