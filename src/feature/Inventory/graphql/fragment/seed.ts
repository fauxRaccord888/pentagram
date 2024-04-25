import { graphql } from "$lib/graphql/__generated__"


graphql(/* GraphQL */ `
    fragment ShadowsMinimalInfo on Shadows {
        id,
        userId
        name,
        color
        bodyLength
        centeringFactor
        matchingFactor
        minDistance
        avoidFactor
        turnFactor
        visualRange
        speedLimit
    }
`)

graphql(/* GraphQL */ `
    fragment CosmosMinimalInfo on Cosmos {
        id,
        userId
        name,
        shootingStarCount,
        shootingStarColors,
        starCount,
        speedParam,
        sizeParam
    }
`)

graphql(/* GraphQL */ `
    fragment OceanMinimalInfo on Ocean {
        id,
        userId
        name
        randomSeed
        waterColor
        foamColor
        foamThickness
        mulScale
    }
`)

