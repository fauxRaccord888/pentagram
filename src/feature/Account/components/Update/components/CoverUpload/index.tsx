import type { UploadCoverPayload } from "$feature/Account/types"
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from "$lib/components/common/Button"
import SearchIcon from "$lib/components/icons/SearchIcon"
import "./style/coverUpload.scss"

type CoverUploadProps = {
    handleUpload: (payload: UploadCoverPayload) => void
}

export default function CoverUpload(props: CoverUploadProps) {
    const { handleUpload } = props
    const { t } = useTranslation()
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = () => {
        if (!file) return
        handleUpload({file})
    }

    const handlePendingImage = (e: ChangeEvent<HTMLInputElement>) => {
        const curFile = e.currentTarget?.files?.[0] 
        if (curFile) {
            setFile(curFile)
        }
    }

    return (
        <div className="account-cover-upload-component">
            <h2 className="account-cover-upload-component__title">{t('account.title.update.cover')}</h2>
            {file &&
                <img className="account-cover-upload-component__upload-preview" src={URL.createObjectURL(file)}/>
            }
            <label className="account-cover-upload-component__upload-input-label" htmlFor="cover-input">
                <div className="account-cover-upload-component__upload-input-label-inner-container">
                    <SearchIcon className="account-cover-upload-component__search-icon-component"/>
                    <span>
                        {file ? file.name.slice(0, 39) : t('account.message.browseFile')}
                    </span>
                </div>
            </label>
            <input 
                id="cover-input" 
                type="file" 
                accept="image/*"
                onChange={handlePendingImage}     
                className="account-cover-upload-component__upload-input" 
            />

            <Button className="account-cover-upload-component__upload-button" onClick={handleSubmit}>
                {t("button.submit")}
            </Button>
        </div>
    )
}