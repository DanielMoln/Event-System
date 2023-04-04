import Organizer from "../models/Organizer.model";
import prisma from "../prisma/Prisma"

export const getAllOrganizer = async () => {
    const organizers = await prisma.organizer.findMany({});
    return organizers;
}

export const createOrganizer = async (body: Organizer) => {
    const { name, email, phone } = body;

    if (name === "" || email === "" || phone === "") {
        throw new Error("A név/email/telefonszám mező üres!");
    }

    const createdOrganizer = await prisma.organizer.create({
        data: {
            Name: name,
            Email: email,
            Phone: phone
        }
    })

    return createdOrganizer;
}

export const deleteOrganizer = async (id: number) => {
    const deletedOrganizer = await prisma.organizer.delete({
        where: {
            id: id
        }
    })
    return deletedOrganizer;
}

export const editOrganizer = async (id: number, body: Organizer) => {
    const { name, email, phone } = body;

    if (name === "" || email === "" || phone === "") {
        throw new Error("A név/email/telefonszám mező üres!");
    }

    const updatedOrganizer = await prisma.organizer.update({
        where: {
            id: id
        },
        data: {
            Email: email,
            Name: name,
            Phone: phone
        },
    })

    return updatedOrganizer;
}