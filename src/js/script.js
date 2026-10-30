//  1. BANCO DE DADOS


const skinTones = [
    "#FFE1C4",
    "#E9B58F",
    "#C9825D",
    "#945B43",
    "#59372F"
];

const hairColors = [
    "#33213B",
    "#70402F",
    "#E9B94F",
    "#D96A9D",
    "#8D78D6",
    "#77BBD0"
];

const outfitColors = {
    pink: {
        main: "#FF69C8",
        shadow: "#D9369C",
        light: "#FFB2E2",
        detail: "#FFE6F5"
    },

    blue: {
        main: "#659BDA",
        shadow: "#3866A6",
        light: "#A9D5FF",
        detail: "#E5F4FF"
    },

    purple: {
        main: "#A987FF",
        shadow: "#7654C6",
        light: "#D0BFFF",
        detail: "#F1E9FF"
    },

    black: {
        main: "#39334F",
        shadow: "#211B34",
        light: "#77708E",
        detail: "#C7C1D9"
    }
};

//    2. ESTADO DO PERSONAGEM

const avatar = {
    name: "PIXEL BABE",
    skin: skinTones[1],
    hairColor: hairColors[3],
    hairStyle: "long",
    eyeStyle: "normal",
    outfit: "pink",
    accessory: "stars"
};


// 3. FERRAMENTAS DE DESENHO

// Cria um retângulo pixelado.

function rect(x, y, width, height, color) {
    return `
        <rect
            x="${x}"
            y="${y}"
            width="${width}"
            height="${height}"
            fill="${color}"
        />
    `;
}


// Desenha uma matriz de pixels.
// Cada letra corresponde a uma cor.

function drawPixels(rows, palette, offsetX = 0, offsetY = 0) {
    let result = "";

    rows.forEach((row, y) => {
        [...row].forEach((symbol, x) => {
            if (palette[symbol]) {
                result += rect(
                    x + offsetX,
                    y + offsetY,
                    1,
                    1,
                    palette[symbol]
                );
            }
        });
    });

    return result;
}


// Cria o contorno escuro de uma área.

function outline(x, y, width, height, color = "#30213D") {
    return rect(x, y, width, height, color);
}

//    4. CABELO TRASEIRO

function createHairBack() {
    const hair = avatar.hairColor;
    const dark = darkenColor(hair, 35);
    const light = lightenColor(hair, 25);

    let drawing = "";

    // Base do cabelo.

    drawing += rect(9, 3, 14, 3, dark);
    drawing += rect(7, 5, 18, 12, dark);
    drawing += rect(8, 5, 16, 12, hair);

    if (avatar.hairStyle === "long") {
        drawing += rect(7, 12, 4, 14, dark);
        drawing += rect(8, 12, 3, 13, hair);

        drawing += rect(21, 12, 4, 14, dark);
        drawing += rect(21, 12, 3, 13, hair);

        drawing += rect(8, 24, 3, 3, dark);
        drawing += rect(21, 24, 3, 3, dark);
    }

    else if (avatar.hairStyle === "bob") {
        drawing += rect(7, 12, 4, 8, dark);
        drawing += rect(8, 12, 3, 7, hair);

        drawing += rect(21, 12, 4, 8, dark);
        drawing += rect(21, 12, 3, 7, hair);

        drawing += rect(9, 18, 14, 3, dark);
        drawing += rect(10, 18, 12, 2, hair);
    }

    else if (avatar.hairStyle === "buns") {
        drawing += rect(4, 3, 6, 5, dark);
        drawing += rect(5, 3, 4, 4, hair);

        drawing += rect(22, 3, 6, 5, dark);
        drawing += rect(23, 3, 4, 4, hair);

        drawing += rect(7, 12, 4, 8, dark);
        drawing += rect(8, 12, 3, 7, hair);

        drawing += rect(21, 12, 4, 8, dark);
        drawing += rect(21, 12, 3, 7, hair);
    }

    else {
        // Cabelo curto.
        drawing += rect(8, 12, 3, 5, dark);
        drawing += rect(21, 12, 3, 5, dark);
    }

    // Brilho do cabelo.

    drawing += rect(11, 4, 5, 1, light);
    drawing += rect(9, 6, 1, 3, light);

    return drawing;
}

//    5. ROSTO

function createFace() {
    const skin = avatar.skin;
    const shadow = darkenColor(skin, 18);
    const light = lightenColor(skin, 12);

    let drawing = "";

    // Contorno

    drawing += outline(9, 6, 14, 13);
    drawing += outline(8, 8, 16, 10);
    drawing += outline(10, 18, 12, 1);

    // Pele

    drawing += rect(10, 7, 12, 11, skin);
    drawing += rect(9, 9, 14, 7, skin);
    drawing += rect(11, 18, 10, 1, skin);

    // Sombras laterais

    drawing += rect(9, 10, 1, 5, shadow);
    drawing += rect(22, 10, 1, 5, shadow);

    // Brilho

    drawing += rect(11, 8, 2, 1, light);

    // Bochechas

    drawing += rect(10, 14, 2, 1, "#F59AAE");
    drawing += rect(20, 14, 2, 1, "#F59AAE");

    return drawing;
}

//    6. OLHOS

function createEyes() {
    let drawing = "";

    if (avatar.eyeStyle === "normal") {
        // Olhos com brilho.

        drawing += rect(11, 11, 3, 3, "#382641");
        drawing += rect(18, 11, 3, 3, "#382641");

        drawing += rect(12, 11, 1, 1, "#FFFFFF");
        drawing += rect(19, 11, 1, 1, "#FFFFFF");

        drawing += rect(12, 13, 1, 1, "#9D6A91");
        drawing += rect(19, 13, 1, 1, "#9D6A91");
    }

    else if (avatar.eyeStyle === "sparkle") {
        drawing += rect(11, 11, 3, 3, "#382641");
        drawing += rect(18, 11, 3, 3, "#382641");

        drawing += rect(11, 11, 1, 1, "#FFFFFF");
        drawing += rect(13, 12, 1, 1, "#FFFFFF");

        drawing += rect(18, 11, 1, 1, "#FFFFFF");
        drawing += rect(20, 12, 1, 1, "#FFFFFF");
    }

    else {
        // Olhos fechados

        drawing += rect(11, 12, 4, 1, "#382641");
        drawing += rect(18, 12, 4, 1, "#382641");
    }

    return drawing;
}

//    7. BOCA

function createMouth() {
    return `
        ${rect(15, 15, 2, 1, "#A84E70")}
        ${rect(14, 14, 1, 1, "#A84E70")}
        ${rect(17, 14, 1, 1, "#A84E70")}
    `;
}

//    8. FRANJA

function createHairFront() {
    const hair = avatar.hairColor;
    const dark = darkenColor(hair, 30);
    const light = lightenColor(hair, 20);

    let drawing = "";

    drawing += rect(8, 4, 16, 3, dark);
    drawing += rect(9, 4, 14, 2, hair);

    if (avatar.hairStyle === "short") {
        drawing += rect(9, 6, 14, 2, hair);
        drawing += rect(10, 8, 4, 2, hair);
        drawing += rect(16, 8, 5, 1, hair);
    }

    else {
        drawing += rect(9, 6, 14, 2, hair);
        drawing += rect(10, 8, 5, 2, hair);
        drawing += rect(15, 8, 5, 1, hair);

        drawing += rect(9, 8, 2, 2, dark);
        drawing += rect(21, 7, 2, 3, dark);
    }

    // Reflexos

    drawing += rect(11, 5, 4, 1, light);

    return drawing;
}

//    9. CORPO E ROUPA

function createBody() {
    const skin = avatar.skin;
    const skinShadow = darkenColor(skin, 18);

    let drawing = "";

    // Pescoço

    drawing += rect(14, 19, 4, 3, skinShadow);
    drawing += rect(14, 19, 3, 2, skin);

    // Braços atrás da roupa

    drawing += outline(7, 22, 5, 9);
    drawing += outline(20, 22, 5, 9);

    drawing += rect(8, 23, 3, 7, skin);
    drawing += rect(21, 23, 3, 7, skin);

    drawing += rect(8, 28, 3, 2, skinShadow);
    drawing += rect(21, 28, 3, 2, skinShadow);

    // Pernas

    drawing += outline(11, 30, 5, 8);
    drawing += outline(17, 30, 5, 8);

    drawing += rect(12, 31, 3, 6, skin);
    drawing += rect(18, 31, 3, 6, skin);

    drawing += rect(12, 36, 3, 1, skinShadow);
    drawing += rect(18, 36, 3, 1, skinShadow);

    // Sapatos

    drawing += outline(10, 37, 6, 3);
    drawing += outline(17, 37, 6, 3);

    drawing += rect(11, 38, 4, 1, "#FFFFFF");
    drawing += rect(18, 38, 4, 1, "#FFFFFF");

    drawing += rect(12, 37, 2, 1, "#FFB5DE");
    drawing += rect(19, 37, 2, 1, "#FFB5DE");

    return drawing;
}


function createOutfit() {
    const colors = outfitColors[avatar.outfit];

    let drawing = "";

    // Contorno da roupa

    drawing += outline(10, 21, 12, 11);
    drawing += outline(8, 22, 4, 5);
    drawing += outline(20, 22, 4, 5);

    // Mangas

    drawing += rect(9, 23, 3, 3, colors.shadow);
    drawing += rect(20, 23, 3, 3, colors.shadow);

    drawing += rect(10, 23, 2, 2, colors.main);
    drawing += rect(20, 23, 2, 2, colors.main);

    // Blusa

    drawing += rect(11, 21, 10, 8, colors.main);
    drawing += rect(12, 21, 8, 1, colors.light);

    // Cintura

    drawing += rect(11, 29, 10, 2, colors.shadow);
    drawing += rect(12, 29, 8, 1, colors.light);

    // Saia

    drawing += rect(10, 30, 12, 3, colors.main);
    drawing += rect(9, 31, 14, 2, colors.shadow);

    drawing += rect(10, 31, 12, 1, colors.light);

    // Detalhe central

    drawing += rect(15, 23, 2, 2, colors.detail);
    drawing += rect(15, 27, 2, 1, colors.detail);

    // Acabamento da saia

    drawing += rect(11, 32, 10, 1, colors.light);

    return drawing;
}


//    10. ACESSÓRIOS

function createAccessories() {
    let drawing = "";

    if (avatar.accessory === "stars") {
        // Estrelinhas no cabelo

        drawing += rect(5, 7, 1, 3, "#FFE36E");
        drawing += rect(4, 8, 3, 1, "#FFE36E");

        drawing += rect(25, 8, 1, 3, "#FFE36E");
        drawing += rect(24, 9, 3, 1, "#FFE36E");
    }

    else if (avatar.accessory === "headphones") {
        drawing += outline(7, 4, 18, 2, "#6B45A8");
        drawing += outline(7, 5, 2, 10, "#6B45A8");
        drawing += outline(23, 5, 2, 10, "#6B45A8");

        drawing += rect(7, 11, 3, 4, "#A987FF");
        drawing += rect(22, 11, 3, 4, "#A987FF");

        drawing += rect(9, 4, 14, 1, "#D9C5FF");
    }

    else if (avatar.accessory === "glasses") {
        drawing += rect(10, 11, 5, 1, "#6B45A8");
        drawing += rect(10, 14, 5, 1, "#6B45A8");
        drawing += rect(10, 12, 1, 2, "#6B45A8");
        drawing += rect(14, 12, 1, 2, "#6B45A8");

        drawing += rect(17, 11, 5, 1, "#6B45A8");
        drawing += rect(17, 14, 5, 1, "#6B45A8");
        drawing += rect(17, 12, 1, 2, "#6B45A8");
        drawing += rect(21, 12, 1, 2, "#6B45A8");

        drawing += rect(15, 12, 2, 1, "#6B45A8");
    }

    return drawing;
}


/* =====================================================
   11. FUNÇÕES DE COR
===================================================== */

function darkenColor(hex, amount) {
    const number = parseInt(hex.replace("#", ""), 16);

    let r = (number >> 16) - amount;
    let g = ((number >> 8) & 0x00FF) - amount;
    let b = (number & 0x0000FF) - amount;

    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);

    return "#" + (
        (1 << 24) +
        (r << 16) +
        (g << 8) +
        b
    ).toString(16).slice(1);
}


function lightenColor(hex, amount) {
    const number = parseInt(hex.replace("#", ""), 16);

    let r = (number >> 16) + amount;
    let g = ((number >> 8) & 0x00FF) + amount;
    let b = (number & 0x0000FF) + amount;

    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);

    return "#" + (
        (1 << 24) +
        (r << 16) +
        (g << 8) +
        b
    ).toString(16).slice(1);
}


/* =====================================================
   12. MONTAGEM DO PERSONAGEM
===================================================== */

function createAvatarSVG() {
    return `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 42"
            width="100%"
            height="100%"
            shape-rendering="crispEdges"
        >
            ${createHairBack()}
            ${createBody()}
            ${createFace()}
            ${createEyes()}
            ${createMouth()}
            ${createOutfit()}
            ${createHairFront()}
            ${createAccessories()}
        </svg>
    `;
}


/* =====================================================
   13. RENDERIZAÇÃO
===================================================== */

function renderAvatar() {
    const container = document.querySelector("#avatar");

    if (!container) return;

    container.innerHTML = createAvatarSVG();
}


/* =====================================================
   14. SELETORES DE CORES
===================================================== */

function createColorOptions(container, colors, property) {
    const area = document.querySelector(container);

    if (!area) return;

    area.innerHTML = "";

    colors.forEach((color) => {
        const button = document.createElement("button");

        button.className = "color-swatch";
        button.style.backgroundColor = color;
        button.type = "button";
        button.setAttribute("aria-label", `Selecionar cor ${color}`);

        button.addEventListener("click", () => {
            avatar[property] = color;

            updateColorSelection();
            renderAvatar();
        });

        area.appendChild(button);
    });
}


function updateColorSelection() {
    document.querySelectorAll("#skinOptions button")
        .forEach((button, index) => {
            button.classList.toggle(
                "selected",
                skinTones[index] === avatar.skin
            );
        });

    document.querySelectorAll("#hairOptions button")
        .forEach((button, index) => {
            button.classList.toggle(
                "selected",
                hairColors[index] === avatar.hairColor
            );
        });
}


/* =====================================================
   15. ATUALIZAÇÃO DOS CONTROLES
===================================================== */

function updateAvatarOptions() {
    const hairStyle = document.querySelector("#hairStyle");
    const eyeStyle = document.querySelector("#eyeStyle");
    const outfit = document.querySelector("#outfit");
    const accessory = document.querySelector("#accessory");
    const name = document.querySelector("#avatarName");

    if (hairStyle) avatar.hairStyle = hairStyle.value;
    if (eyeStyle) avatar.eyeStyle = eyeStyle.value;
    if (outfit) avatar.outfit = outfit.value;
    if (accessory) avatar.accessory = accessory.value;
    if (name) avatar.name = name.value;

    renderAvatar();
}


function syncControls() {
    const controls = {
        "#hairStyle": avatar.hairStyle,
        "#eyeStyle": avatar.eyeStyle,
        "#outfit": avatar.outfit,
        "#accessory": avatar.accessory,
        "#avatarName": avatar.name
    };

    Object.entries(controls).forEach(([selector, value]) => {
        const element = document.querySelector(selector);

        if (element) {
            element.value = value;
        }
    });
}


/* =====================================================
   16. GERADOR ALEATÓRIO
===================================================== */

function randomizeAvatar() {
    function randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    avatar.skin = randomChoice(skinTones);
    avatar.hairColor = randomChoice(hairColors);

    avatar.hairStyle = randomChoice([
        "long",
        "bob",
        "buns",
        "short"
    ]);

    avatar.eyeStyle = randomChoice([
        "normal",
        "sparkle",
        "sleepy"
    ]);

    avatar.outfit = randomChoice([
        "pink",
        "blue",
        "purple",
        "black"
    ]);

    avatar.accessory = randomChoice([
        "stars",
        "headphones",
        "glasses",
        "none"
    ]);

    syncControls();
    updateColorSelection();
    renderAvatar();
}


/* =====================================================
   17. LOCAL STORAGE
===================================================== */

function getSavedAvatars() {
    try {
        return JSON.parse(
            localStorage.getItem("avatarLabCollection") || "[]"
        );
    } catch (error) {
        console.error("Erro ao carregar a coleção:", error);
        return [];
    }
}


function saveAvatar() {
    const collection = getSavedAvatars();

    const newAvatar = {
        ...avatar,
        id: Date.now()
    };

    collection.push(newAvatar);

    localStorage.setItem(
        "avatarLabCollection",
        JSON.stringify(collection)
    );

    updateSavedCount();
    renderCollection();

    const button = document.querySelector("#saveButton");

    if (button) {
        const originalText = button.textContent;

        button.textContent = "SAVED! ♥";

        setTimeout(() => {
            button.textContent = originalText;
        }, 1200);
    }
}


function updateSavedCount() {
    const counter = document.querySelector("#savedCount");

    if (counter) {
        counter.textContent = getSavedAvatars().length;
    }
}


/* =====================================================
   18. COLEÇÃO DE PERSONAGENS
===================================================== */

function createSavedAvatarSVG(savedAvatar) {
    const currentAvatar = { ...avatar };

    Object.assign(avatar, savedAvatar);

    const svg = createAvatarSVG();

    Object.assign(avatar, currentAvatar);

    return svg;
}


function renderCollection() {
    const collection = getSavedAvatars();

    const grid = document.querySelector("#collectionGrid");
    const emptyMessage = document.querySelector("#emptyMessage");

    if (!grid || !emptyMessage) return;

    grid.innerHTML = "";

    emptyMessage.classList.toggle(
        "hidden",
        collection.length > 0
    );

    collection.forEach((savedAvatar) => {
        const card = document.createElement("article");
        card.className = "doll-card";

        const preview = document.createElement("div");
        preview.className = "doll-preview";
        preview.innerHTML = createSavedAvatarSVG(savedAvatar);

        const name = document.createElement("strong");
        name.textContent = savedAvatar.name || "MY DOLL";

        const editButton = document.createElement("button");
        editButton.textContent = "EDIT DOLL";
        editButton.type = "button";

        editButton.addEventListener("click", () => {
            Object.assign(avatar, savedAvatar);

            syncControls();
            updateColorSelection();
            renderAvatar();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";
        deleteButton.type = "button";
        deleteButton.className = "delete-doll";

        deleteButton.addEventListener("click", () => {
            const updatedCollection = getSavedAvatars()
                .filter((item) => item.id !== savedAvatar.id);

            localStorage.setItem(
                "avatarLabCollection",
                JSON.stringify(updatedCollection)
            );

            updateSavedCount();
            renderCollection();
        });

        card.append(
            preview,
            name,
            editButton,
            deleteButton
        );

        grid.appendChild(card);
    });
}


/* =====================================================
   19. EXPORTAR PERSONAGEM EM PNG
===================================================== */

function exportAvatar() {
    const svgContent = createAvatarSVG();

    const blob = new Blob(
        [svgContent],
        { type: "image/svg+xml;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
        const canvas = document.createElement("canvas");

        canvas.width = 768;
        canvas.height = 1008;

        const context = canvas.getContext("2d");

        context.imageSmoothingEnabled = false;

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
        );

        URL.revokeObjectURL(url);

        const link = document.createElement("a");

        link.download = "my-pixel-avatar.png";
        link.href = canvas.toDataURL("image/png");

        link.click();
    };

    image.onerror = () => {
        URL.revokeObjectURL(url);
        alert("Não foi possível exportar o personagem.");
    };

    image.src = url;
}


/* =====================================================
   20. INICIALIZAÇÃO DO PROJETO
===================================================== */

function initializeAvatarLab() {

    // Criar seletores de cores.

    createColorOptions(
        "#skinOptions",
        skinTones,
        "skin"
    );

    createColorOptions(
        "#hairOptions",
        hairColors,
        "hairColor"
    );

    // Atualizar opções de personalização.

    [
        "#hairStyle",
        "#eyeStyle",
        "#outfit",
        "#accessory"
    ].forEach((selector) => {
        const element = document.querySelector(selector);

        if (element) {
            element.addEventListener(
                "change",
                updateAvatarOptions
            );
        }
    });

    // Atualizar nome.

    const nameInput = document.querySelector("#avatarName");

    if (nameInput) {
        nameInput.addEventListener("input", () => {
            avatar.name = nameInput.value;
        });
    }

    // Botão aleatório.

    document.querySelector("#randomButton")
        ?.addEventListener("click", randomizeAvatar);

    // Salvar personagem.

    document.querySelector("#saveButton")
        ?.addEventListener("click", saveAvatar);

    // Exportar.

    document.querySelector("#exportButton")
        ?.addEventListener("click", exportAvatar);

    // Abrir coleção.

    document.querySelector("#collectionButton")
        ?.addEventListener("click", () => {
            const section = document.querySelector("#collectionSection");

            if (!section) return;

            section.classList.remove("hidden");

            renderCollection();

            section.scrollIntoView({
                behavior: "smooth"
            });
        });

    // Fechar coleção.

    document.querySelector("#closeCollection")
        ?.addEventListener("click", () => {
            document.querySelector("#collectionSection")
                ?.classList.add("hidden");
        });

    // Primeira renderização.

    updateColorSelection();
    renderAvatar();
    updateSavedCount();
}


// Iniciar somente depois do carregamento do HTML.

document.addEventListener(
    "DOMContentLoaded",
    initializeAvatarLab
);