import { CustomError } from "$lib/error"

// Profile
export class DuplicateMutableIdError extends CustomError {
    constructor() {
        super(
            '중복된 아이디입니다.',
            'account.toast.error.notUniqueMutableId'
        )
    }
}

// Auth
export class RateLimitError extends CustomError {
    constructor() {
        super(
            '계정 보안을 위해 요청의 빈도를 제한하고 있어요.',
            'account.toast.error.rateLimit'
        )
    }
}

export class SamePasswordError extends CustomError {
    constructor() {
        super(
            '새로운 비밀번호는 이전과 같을 수 없어요.',
            'account.toast.error.samePassword'
        )
    }
}

export class WeakPasswordError extends CustomError {
    constructor() {
        super(
            '너무 쉬운 비밀번호입니다.',
            'account.toast.error.weakPassword'
        )
    }
}

export class DuplicateEmailError extends CustomError {
    constructor() {
        super(
            '중복된 이메일입니다.',
            'account.toast.error.notUniqueEmail'
        )
    }
}

// Cover
export class ExceedMaximumSizeError extends CustomError {
    constructor() {
        super(
            '업로드 가능한 최대 용량을 초과하였습니다.',
            'account.toast.error.exceedMaximumSize'
        )
    }
}