// COMMENT
// 배열을 셔플 후 뽑는 알고리즘을 사용할 경우 확률 편향이 있음
// 이는 자바스크립트 배열이 매번 value를 비교하지 않기 때문(소팅 알고리즘)
// k개 필요 시, k회 난수 생성 후 반복 및 중복 제외 절차 별도 구현 필요

export function pickRandomElementFromArray<T>(array: T[]) {
    const index = Math.floor(Math.random() * array.length - Number.EPSILON)
    return array[index]
}