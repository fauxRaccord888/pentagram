import type { InsertArtistsMutation, InsertGenresMutation, InsertOeuvresMutation, UpdateArtistsMutation, UpdateGenresMutation, UpdateOeuvresMutation } from '$lib/graphql/__generated__/graphql';
import type { FetchResult } from '@apollo/client';
import { getFirstRecordOfResponse } from '$lib/utils/graphql';
import { useMutation } from '@apollo/client';
import { InvalidInputError } from '$lib/error/customError';

type MetaDataMutations = InsertArtistsMutation 
    | InsertGenresMutation 
    | InsertOeuvresMutation
    | UpdateArtistsMutation
    | UpdateGenresMutation
    | UpdateOeuvresMutation

export async function executeMutateMetaData(payload: {
    id?: string,
    data: FormData, 
    mutationFunc: ReturnType<typeof useMutation<MetaDataMutations>>[0],
}) {
    const { id, data, mutationFunc } = payload
    const title = data.get('title')
    const description = data.get('description')

    if (!title || !description) throw new InvalidInputError()

    const response = await mutationFunc({
        variables: {
            id,
            title, 
            description
        }
    })

    if (response.errors) throw response.errors

    const resId = id ?? getId(response)
    if (!resId) throw new Error()

    return {
        response,
        id: resId,
    }
}


function getId(response: FetchResult<MetaDataMutations>) {
    let id = undefined
    if (
        response.data && 
        "insertIntoArtistsCollection" in response.data
    ) {
        id = getFirstRecordOfResponse(response.data.insertIntoArtistsCollection)?.id
    }

    if (
        response.data && 
        "insertIntoGenresCollection" in response.data
    ) {
        id = getFirstRecordOfResponse(response.data.insertIntoGenresCollection)?.id
    }

    if (
        response.data && 
        "insertIntoOeuvresCollection" in response.data
    ) {
        id = getFirstRecordOfResponse(response.data.insertIntoOeuvresCollection)?.id
    }

    return id
}