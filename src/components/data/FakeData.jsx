export const fakeData = () =>{

    const fakeUser = {
        userId: 1,
        firstName: "Alex",
        lastName: "Martin",
    };

    const fakeContact = {
        id: 2,
        firstName: "Sarah",
        lastName: "Dupont",
        picturePath: "https://i.pravatar.cc/150?img=47",
    };

    const fakeMessages = [
        {
            id: 1,
            senderId: 2,
            content: "Salut ! 👋",
            createdAt: "2025-01-05T10:30:00",
        },
        {
            id: 2,
            senderId: 1,
            content: "Hey Sarah ! Comment tu vas ?",
            createdAt: "2025-01-05T10:31:00",
        },
        {
            id: 3,
            senderId: 2,
            content: "Super bien 😄 Et toi ?",
            createdAt: "2025-01-05T10:32:00",
        },
        {
            id: 4,
            senderId: 1,
            content: "Très bien ! Tu travailles sur quoi en ce moment ?",
            createdAt: "2025-01-05T10:33:00",
        },
        {
            id: 5,
            senderId: 2,
            content: "Sur un nouveau projet perso 🚀",
            createdAt: "2025-01-05T10:34:00",
        },
    ];

    return { fakeUser, fakeContact, fakeMessages };
}

