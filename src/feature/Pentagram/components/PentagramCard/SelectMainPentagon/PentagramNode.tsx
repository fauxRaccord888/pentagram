import type { MouseEventHandler } from 'react';
import type { DBPentagramNodes, PentagramEventHandler, PentagramSelectOptions } from '../../../types';
import type { OeuvreEventHandler } from '$feature/Oeuvre/types';
import { useHover } from '$lib/hooks';
import { getSnapshot, getUnionedChanges } from '../../../utils';
import PositionAdjuster from '../../common/PositionAdjuster';
import OeuvreNode from '$feature/Oeuvre/components/OeuvreNode';
import OeuvreNodeHoverCard from '$feature/Oeuvre/components/OeuvreNodeHoverCard';

import "./style/pentagramNode.scss"

type PentagramNodeProps = {
    item: DBPentagramNodes,
    inView: boolean
    timestamp: Date
    options: PentagramSelectOptions
    eventHandler: PentagramEventHandler & OeuvreEventHandler
}

export default function PentagramNode(props: PentagramNodeProps) {
    const { item, inView, timestamp, options, eventHandler } = props
    const hoverHook = useHover()

    const unionedChanges = getUnionedChanges(item)
    const { id, oeuvre } = item
    const position= getSnapshot(unionedChanges, timestamp)
    const prevPosition = getSnapshot(unionedChanges, timestamp, true)

    const onClickNode: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        if (eventHandler?.nodeSelectModal) eventHandler.nodeSelectModal(id)
    }

    return (
        <>
            {item && 
            typeof position.angle === 'number' &&
            typeof position.distance === 'number' &&
                <PositionAdjuster 
                    inView={inView}
                    enableAnimation={options.enableAnimation}
                    position={position}
                    prevPosition={prevPosition}
                >
                    <div
                        className="pentagram-node-component"
                        onClick={onClickNode}
                    >
                        <OeuvreNode item={oeuvre} hoverHook={hoverHook} />
                        <OeuvreNodeHoverCard item={oeuvre} hoverHook={hoverHook} eventHandler={eventHandler} />
                    </div>
                </PositionAdjuster>
            }
        </>
    )
}
