import type { ISlotComponent, ISlotOption } from "../type"
import type { MouseEventHandler } from "react"
import { filterComponents } from "../util"
import "./style/infoCard.scss"

export type InfoCardKey = "coverImage" | "title" | "mainInfo" | "subInfo"
export type InfoCardOptions = ISlotOption<InfoCardKey>

type InfoCardProps = {
    id: string,
    components: ISlotComponent<InfoCardKey>,
    options?: InfoCardOptions,
    onClick?: MouseEventHandler<HTMLDivElement>
}

export default function InfoCardTemplate (props: InfoCardProps) {
    const { components, options, ...restProps } = props
    const filteredComponents = filterComponents<InfoCardKey>(components, options)

    return (
        <div 
            {...restProps}
            className="info-card-template"
        >
            {filteredComponents?.coverImage &&
                <div className="info-card-template__cover-outer-container">
                    <div className="info-card-template__cover-inner-container">
                        {filteredComponents.coverImage}
                    </div>
                </div>
            }
            {
                (filteredComponents.title ||
                filteredComponents.mainInfo ||
                filteredComponents.subInfo) &&
                    <div className="info-card-template__main-container">
                        {filteredComponents.title &&
                            <div className="info-card-template__title">
                                {filteredComponents.title}
                            </div>
                        }
                        {(
                            (filteredComponents?.mainInfo) ||
                            (filteredComponents?.subInfo)
                        ) &&
                            <div className="info-card-template__info-container">
                                {filteredComponents.mainInfo &&
                                    <div className="info-card-template__main-info">
                                        {filteredComponents.mainInfo}
                                    </div>
                                }
                                {filteredComponents.subInfo &&
                                    <div className="info-card-template__sub-info">
                                        {filteredComponents.subInfo}
                                    </div>
                                }
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

