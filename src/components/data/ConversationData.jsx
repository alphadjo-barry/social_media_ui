export const conversationData = ()=> {

    const currentUser = {
        id: 1,
        firstName: "Alex",
    };

    const conversations = [
        {
            id: 101,
            user: {
                id: 2,
                firstName: "Sarah",
                lastName: "Dupont",
                picturePath: "https://i.pravatar.cc/150?img=47",
                online: true,
            },
            lastMessage: "Sur un nouveau projet 🚀",
            updatedAt: "2025-01-05T10:34:00",
            messages: [
                {
                    id: 1,
                    senderId: 2,
                    content: "Salut 👋",
                    createdAt: "2025-01-05T10:30:00",
                },
                {
                    id: 2,
                    senderId: 1,
                    content: "Hey Sarah !",
                    createdAt: "2025-01-05T10:31:00",
                },
            ],
        },
        {
            id: 102,
            user: {
                id: 3,
                firstName: "Lucas",
                lastName: "Moreau",
                picturePath: "https://i.pravatar.cc/150?img=12",
                online: false,
            },
            lastMessage: "À bientôt 👍",
            updatedAt: "2025-01-04T18:20:00",
            messages: [
                {
                    id: 3,
                    senderId: 3,
                    content: "On se voit demain ?",
                    createdAt: "2025-01-04T18:15:00",
                },
                {
                    id: 4,
                    senderId: 1,
                    content: "Oui avec plaisir !",
                    createdAt: "2025-01-04T18:16:00",
                },
            ],
        },
    ];

    return { currentUser, conversations };

}