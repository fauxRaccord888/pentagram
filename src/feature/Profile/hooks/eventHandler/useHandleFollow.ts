import { useFollowMutation } from ".."
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "$feature/auth/hooks";

import toast from "react-hot-toast";
import { AccessNotGrantedError, CustomError, CustomUnknownError } from "$lib/error/customError";
import { calcFollowings } from "../../util"
import { isCustomError } from "$lib/utils";

// TODO 바깥 스코프 에러(gql 에러 등)에 대한 핸들러가 존재하지 않음.
export function useHandleFollow() {
    const {
        follow: followMutation,
        unfollow: unfollowMutation
    } = useFollowMutation()
    const { currentUser } = useCurrentUser()
    const { t } = useTranslation()
    
    const handleFollow = async (id: string | null | undefined) => {
        if (!id || currentUser?.id === id) {
            throw new CustomUnknownError()
        }

        const followings = calcFollowings(currentUser)
        const followed = followings.has(id)

        if (!currentUser) {
            throw new AccessNotGrantedError()
        }
    
        if (followed) unfollowMutation(id, currentUser)
        else followMutation(id, currentUser)
    }

    const followOuterHandler = (id: string | null | undefined, fallbackFunction?: () => void) => {
        const response = handleFollow(id)
        toast.promise(response, {
            loading: t("account.toast.loading.follow"),
            success: t("account.toast.success.follow"),
            error: (err: CustomError) => t(err.i18nKey)
        })
        response.catch((err) => {
            if (isCustomError(err) && err.i18nKey === 'auth.toast.error.accessNotGranted') {
                if (fallbackFunction) fallbackFunction()
            }
        })
    }

    return followOuterHandler
}