import type { DBProfiles, ProfileEventHandler, ProfileLoadMorePayload } from "../types";
import type { PentagramEventHandler } from '$feature/Pentagram/types';
import type { OeuvreEventHandler } from '$feature/Oeuvre/types';
import type { BaseEventHandler } from '$lib/types/components';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NETWORK } from '$lib/constants';

import SelectViewTemplate from '$feature/template/components/SelectViewTemplate';
import PentagramCard from '$feature/Pentagram/components/PentagramCard';
import FeedItem from '$feature/feed/components/FeedItem';
import ProfileInfoCard from './UserInfoCard';
import Tab from '$lib/components/common/Tab';
import InfiniteScrollTrigger from '$lib/components/common/InfiniteScrollTrigger';

import "./style/profileSelectView.scss"

export default function ProfileSelectView(props: {
    item: DBProfiles
    eventHandler: 
        ProfileEventHandler & 
        PentagramEventHandler & 
        OeuvreEventHandler &
        BaseEventHandler<ProfileLoadMorePayload> 
}) {
    const { item, eventHandler } = props
    const { t } = useTranslation()

    const infoCardComponent = (
        <ProfileInfoCard 
            item={item} 
            renderConfig={{
                coverImage: true,
                title: true,
                mainInfo: true,
                subInfo: true,
            }}
            options={{
                roundedCover: true,
                miniView: false,
                displayFollow: true,
                displayInteraction: true,
            }}
            eventHandler={eventHandler}
        />
    )

    const pentagramComponents = useMemo(() => (
        item?.pentagramsCollection?.edges.map((edge) => (
            <PentagramCard
                key={edge.node.id}
                item={edge.node}
                renderConfig={{
                    metaInfo: true,
                    mainPentagon: true,
                    revision: false,
                    player: true
                }}
                eventHandler={eventHandler}
                options={{
                    enableAnimation: true
                }}
            />
        )) || []
    ), [eventHandler, item?.pentagramsCollection?.edges])

    const pentagramLoader = useMemo(() => {
        const handleLoadMore = () => {
            if (eventHandler.handleLoadMore) eventHandler.handleLoadMore({
                revisionLimit: 0, 
                pentagramLimit: NETWORK.readLimit
            })
        }
        return (
            <InfiniteScrollTrigger
                hasNextPage={item.pentagramsCollection?.pageInfo.hasNextPage}
                handleLoadMore={handleLoadMore}
            />
        )
    }, [eventHandler, item.pentagramsCollection?.pageInfo.hasNextPage])

    const revisionComponents = useMemo(() => (
        item?.pentagramRevisionsCollection?.edges.map((edge) => (
            <FeedItem
                key={edge.node.id}
                item={edge.node}
                renderConfig={{
                    item: true,
                    message: false,
                }}
                options={{
                    showMessage: false
                }}
                eventHandler={eventHandler}
            />
        )) || []
    ), [eventHandler, item?.pentagramRevisionsCollection?.edges])

    const revisionLoader = useMemo(() => {
        const handleLoadMore = () => {
            if (eventHandler.handleLoadMore) eventHandler.handleLoadMore({
                revisionLimit: NETWORK.readLimit, 
                pentagramLimit: 0
            })
        }

        return (
            <InfiniteScrollTrigger
                hasNextPage={item.pentagramRevisionsCollection?.pageInfo.hasNextPage}
                handleLoadMore={handleLoadMore}
            />
        )
    }, [eventHandler, item.pentagramRevisionsCollection?.pageInfo.hasNextPage])

    const tabComponent = (
        <Tab items={[
            {
                label: t("profile.tab.pentagram"),
                items: pentagramComponents.concat(pentagramLoader)
            },
            {
                label: t("profile.tab.feed"),
                items: revisionComponents.concat(revisionLoader)
            }
        ]} />
    )

    return (
        <div className="profile-select-view-component">
            <SelectViewTemplate
                components={{
                    infoCard: infoCardComponent,
                    tab: tabComponent
                }}
            />
        </div>
    )
}