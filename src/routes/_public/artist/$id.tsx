import type { GetArtistInfoByIdQuery } from "$lib/graphql/__generated__/graphql";
import type { ArtistEventHandler } from "$feature/Artist/types";
import type { BaseEventHandler } from "$lib/types/components";
import type { OeuvreEventHandler } from "$feature/Oeuvre/types";
import { useQuery } from "@apollo/client";
import { useArtistNavigate, useOeuvreNavigate, useRedirectOnError } from "$feature/navigate/hooks";
import { t as translate } from 'i18next'
import { getFirstNodeOfCollection } from "$lib/utils/graphql";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { getArtistInfoById_QUERY } from "$feature/Artist/graphql/query";
import { NETWORK } from "$lib/constants";
import ArtistSelectView from "$feature/Artist/components/ArtistSelectView";

export const Route = createFileRoute('/_public/artist/$id')({
    component: Artist,
    beforeLoad: () => {
        return {
            getTitle: () => translate('artist.title.index')
        }
    }
})

function Artist() {
    const params = Route.useParams()
    const { data, error, fetchMore } = useQuery<GetArtistInfoByIdQuery>(getArtistInfoById_QUERY, {
        variables: { 
            id: params.id, 
            cursor: null,
            limit: NETWORK.readLimit
        }
    })
    const item = getFirstNodeOfCollection(data?.artistsCollection)

    const oeuvreNavigate = useOeuvreNavigate()
    const artistNavigate = useArtistNavigate()
    useRedirectOnError(Boolean(
        (data && !item) 
        || error
    ))
    
    const eventHandler: BaseEventHandler & ArtistEventHandler & OeuvreEventHandler = {
        handleLoadMore: () => fetchMore({
            variables: {
                cursor: item?.oeuvresArtistsCollection?.pageInfo?.endCursor,
                limit: NETWORK.readLimit,
                id: params.id
            }
        }),
        selectOeuvre: (oeuvre) => oeuvreNavigate.select(oeuvre.id),
        updateArtist: (artist) => artistNavigate.update(artist.id)
    }

    if (!item) return null
    
    return (
        <div className="profile-container">
            <ArtistSelectView
                item={item}
                eventHandler={eventHandler}
                options={{
                    enableUpdate: true
                }}
            />
            <Outlet />
        </div>
    )
}