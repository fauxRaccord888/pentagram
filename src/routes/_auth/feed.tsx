import type { PentagramEventHandler } from '$feature/Pentagram/types';
import type { OeuvreEventHandler } from '$feature/Oeuvre/types';
import { useFeed } from '$feature/feed/hooks';
import { useOeuvreNavigate, usePentagramNavigate, useProfileNavigate } from "$feature/navigate/hooks"
import { t as translate } from 'i18next';
import { Outlet, createFileRoute } from '@tanstack/react-router'

import FeedList from '$feature/feed/components/FeedList';

export const Route = createFileRoute('/_auth/feed')({
    beforeLoad: () => {
        return {
            getTitle: () => translate('feed.title.index')
        }
    },
    component: Feed,
})

function Feed() {
    const { feed, recommendedUsers, hasNextPage, fetchMoreFeed } = useFeed()
    const navigate = usePentagramNavigate();
    const oeuvreNavigate = useOeuvreNavigate()
    const profileNavigate = useProfileNavigate()
    const pentagramNavigate = usePentagramNavigate()

    const eventHandler: PentagramEventHandler & OeuvreEventHandler = {
        pentagramMenuModal: (pentagramId: string) => navigate.pentagramSelectModal(pentagramId),
        nodeSelectModal: (nodeId: string) => navigate.nodeSelectModal(nodeId),
        revisionSelectModal: (revisionId: string) => navigate.revisionSelectModal(revisionId),
        navigateToUpdate:(id: string) => pentagramNavigate.update(id),
        selectOeuvre: (oeuvre) => oeuvreNavigate.select(oeuvre.id),
        selectProfile: (profile) => profileNavigate.profileSelect(profile.mutableId)
    }

    const items = feed?.items ? feed.items.edges.map((edge) => edge.node) : []

    return (
        <>
            <FeedList
                items={items}
                hasNextPage={hasNextPage}
                fetchMoreFeed={fetchMoreFeed}
                recommendedUsers={recommendedUsers}
                renderConfig={{
                    message: true,
                    item: true
                }}
                options={{
                    showMessage: true
                }}
                eventHandler={eventHandler}
            />
            <Outlet />
        </>
    )
}