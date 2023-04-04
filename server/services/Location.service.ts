import Location from "../models/Location.model";
import prisma from "../prisma/Prisma"

export const getAllLocation = async () => {
    const locations = await prisma.location.findMany({});
    return locations;
}

export const createLocation = async (body: Location) => {
    const { name, longitude, latitude } = body;

    if (name === "") {
        throw new Error("A név mező üres!");
    }

    const createdLocation = await prisma.location.create({
        data: {
            Name: name,
            latitude: latitude,
            longitude: longitude
        }
    })

    return createdLocation;
}

export const deleteLocation = async (id: number) => {
    const deletedLocation = await prisma.location.delete({
        where: {
            id: id
        }
    })
    return deletedLocation;
}

export const editLocation = async (id: number, body: Location) => {
    const { name, longitude, latitude } = body;

    if (name === "") {
        throw new Error("A név mező üres!");
    }

    const updatedLocation = await prisma.location.update({
        where: {
            id: id
        },
        data: {
            Name: name,
            latitude: latitude,
            longitude: longitude
        },
    })

    return updatedLocation;
}