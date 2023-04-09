import moment from "moment";
import Event from "../models/Event.model";
import prisma from "../prisma/Prisma";

export const getAllEvent = async () => {
    const Events = await prisma.event.findMany({
        include: {
            Location: true,
            Organizer: true
        }
    });
    return Events;
}

export const createEvent = async (body: Event) => {
    const { name, date, description, timepoint, location, organizer } = body;

    if (name === "") {
        throw new Error("A név mező üres!");
    }

    const createdEvent = await prisma.event.create({
        data: {
            Name: name,
            Date: moment(date).toDate(),
            Description: description,
            Location: {
                connect: {
                    id: location
                }
            },
            Organizer: {
                connect: {
                    id: organizer
                }
            },
            TimePoint: timepoint
        }
    })

    return createdEvent;
}

export const deleteEvent = async (id: number) => {
    const deletedEvent = await prisma.event.delete({
        where: {
            id: id
        }
    })
    return deletedEvent;
}

export const editEvent = async (id: number, body: Event) => {
    const { name, date, description, timepoint, location, organizer } = body;

    if (name === "" || description === "") {
        throw new Error("A név/leírás mező üres!");
    }

    const updatedEvent = await prisma.event.update({
        where: {
            id: id
        },
        data: {
            Name: name,
            Date: date,
            Description: description,
            Location: {
                connect: {
                    id: location
                }
            },
            Organizer: {
                connect: {
                    id: organizer
                }
            },
            TimePoint: timepoint
        },
    })

    return updatedEvent;
}