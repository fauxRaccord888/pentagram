import type { DBMiniProfile } from "$feature/Profile/types";
import type { ISlotRenderConfig } from "$feature/template/type";
import type { PentagramDecorationsMinimalInfoFragment, PentagramNodesInfoFragment, PentagramRevisionsMinimalInfoFragment, PentagramsSelectInfoFragment, PentagramsUpdateInfoFragment } from "$lib/graphql/__generated__/graphql";

export type DBPentagram_SELECT = PentagramsSelectInfoFragment
export type DBPentagram_UPDATE = PentagramsUpdateInfoFragment

export type DBPentagramNodes = PentagramNodesInfoFragment
export type DBPentagramRevisions = PentagramRevisionsMinimalInfoFragment
export type DBPentagramDecorations = PentagramDecorationsMinimalInfoFragment

export type PentagramSelectRenderConfig = ISlotRenderConfig<"metaInfo" | "mainPentagon" | "revision" | "player">
export type PentagramSelectOptions = {
    displayRevisionIds?: string[] | null | undefined,
    forcedTimestamp?: Date | null | undefined
    enableAnimation?: boolean
}

export type PentagramDecorationPayload = {
    pentagramId: string | undefined,
    decorationId: string
}

export type PentagramEventHandler = {
    selectProfile?: (profile: DBMiniProfile) => void, 
    pentagramMenuModal?: (pentagramId: string) => void,
    nodeSelectModal?: (nodeId: string) => void,
    revisionSelectModal?: (revisionId: string) => void,
    navigateToUpdate?: (pentagramId: string) => void
}

export type PentagramPlayerEventHandler = {
    setTimestamp?: (date: Date) => void
    playPentagram?: (interval?: number) => void
}

export type PentagramNodePosition = {
    angle: number | null | undefined;
    distance: number | null | undefined;
    deleted: boolean | null | undefined;
}