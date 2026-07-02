
// 1. DATA RUMAH SAKIT
const dataFaskes = [
    { id: "N1", nama: "RSUD Pasar Minggu", jarak: 0.85, layanan: ["IGD", "ICU", "MRI", "Radiologi", "MCU", "Laboratorium"] },
    { id: "N2", nama: "Aji Waras Klinik", jarak: 1.8, layanan: ["Poli Umum", "Laboratorium", "Radiologi", "USG", "Apotek"] },
    { id: "N3", nama: "Lamina Hospital", jarak: 3.1, layanan: ["MRI", "Radiologi", "MCU", "Laboratorium", "CT SCAN", "X-Ray"] },
    { id: "N4", nama: "Kemang Medical Care Hospital", jarak: 2.1, layanan: ["IGD", "ICU", "HCU", "NICU", "Radiologi", "Laboratorium", "Apotek"] },
    { id: "N5", nama: "RS Murni Teguh Pejaten", jarak: 2.3, layanan: ["IGD", "ICU", "Radiologi", "Laboratorium", "Rehabilitasi"] },
    { id: "N6", nama: "RS Jakarta Medical Center", jarak: 3.4, layanan: ["IGD", "ICU", "Radiologi", "Laboratorium", "Apotek"] },
    { id: "N7", nama: "RSUD Jagakarsa", jarak: 3.5, layanan: ["IGD", "Radiologi", "MCU", "Laboratorium"] },
    { id: "N8", nama: "RS Marinir Cilandak", jarak: 6, layanan: ["IGD", "ICU", "Radiologi", "MCU", "Laboratorium"] },
    { id: "N9", nama: "RSUD Jati Padang", jarak: 3.5, layanan: ["IGD", "Radiologi", "MCU", "Laboratorium", "Apotek"] }
];

const kamusNama = {
    "N0": "UNSIA", "N1": "RSUD Pasar Minggu", "N2": "Aji Waras Klinik", "N3": "Lamina Hospital", 
    "N4": "Kemang Medical Care", "N5": "RS Murni Teguh", "N6": "RS JMC", "N7": "RSUD Jagakarsa", 
    "N8": "RS Marinir", "N9": "RSUD Jati Padang",
    "J1": "Jl. Harsono RM", "J2": "Jl. TB Simatupang", "J3": "Jl. Raya Cilandak KKO",
    "J4": "Jl. Ampera Raya", "J5": "Jl. Warung Jati Barat", "J6": "Jl. Hajjah Tutti Alawiyah",
    "J7": "Jl. Saco Ragunan", "J8": "Jl. Intan RSPP", "J9": "Jl. Raya Ragunan"
};


// 2. STRUKTUR GRAPH

const graphPeta = {
    "N0": ["J1"], 
    "J1": ["N0", "J2", "J5", "J7"],
    "J2": ["J1", "N1", "J3", "J4", "J8"], 
    "N1": ["J2"], 
    "J3": ["J2", "N2"], 
    "N2": ["J3"],
    "J4": ["J2", "N4"], 
    "N4": ["J4"],
    "J8": ["J2", "N8"], 
    "N8": ["J8"],
    "J5": ["J1", "N5", "N3", "J6", "J9"], 
    "N5": ["J5"],
    "N3": ["J5"],
    "J6": ["J5", "N6"], 
    "N6": ["J6"],
    "J9": ["J5", "N9"], 
    "N9": ["J9"],
    "J7": ["J1", "N7"], 
    "N7": ["J7"]
};

for (let key in graphPeta) graphPeta[key].sort();


// 3. ALGORITMA PENCARIAN (LINEAR SEARCH)

function searchingLayanan(kataKunci) {
    return dataFaskes.filter(rs => 
        rs.layanan.some(l => l.toLowerCase().includes(kataKunci.toLowerCase())) ||
        rs.nama.toLowerCase().includes(kataKunci.toLowerCase())
    );
}


// 4. ALGORITMA PENGURUTAN (BUBBLE SORT)

function sortingJarak(arrayData) {
    let arr = [...arrayData];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j].jarak > arr[j + 1].jarak) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}


// 5. ALGORITMA TRAVERSAL (BFS & DFS - Tetap Simpel)


function ruteBFS(start, target) {
    let antrean = [[start]];
    let dikunjungi = new Set([start]);
    let logPencarian = []; 

    while (antrean.length > 0) {
        let jalur = antrean.shift();
        let nodeSekarang = jalur[jalur.length - 1];
        
        logPencarian.push(nodeSekarang); // Catat jejak

        if (nodeSekarang === target) {
            return { ruteAsli: jalur, jejakVisual: logPencarian };
        }

        let tetangga = graphPeta[nodeSekarang] || [];
        for (let t of tetangga) {
            if (!dikunjungi.has(t)) {
                dikunjungi.add(t);
                antrean.push([...jalur, t]);
            }
        }
    }
    return null;
}

function ruteDFS(start, target, dikunjungi = new Set(), jalur = [], logPencarian = []) {
    dikunjungi.add(start);
    jalur.push(start);
    logPencarian.push(start); // Catat jejak

    if (start === target) {
        return { ruteAsli: jalur, jejakVisual: logPencarian };
    }

    let tetangga = graphPeta[start] || [];
    for (let t of tetangga) {
        if (!dikunjungi.has(t)) {
            let hasilJalur = ruteDFS(t, target, dikunjungi, [...jalur], logPencarian);
            if (hasilJalur) {
                return hasilJalur;
            }
        }
    }
    return null;
}


// 6. LOGIKA ANTARMUKA UI 

const box = document.getElementById("outputBox");
let animasiSedangBerjalan = false;

function pemicuCari() {
    const keyword = document.getElementById("inputCari").value;
    const hasil = searchingLayanan(keyword);
    if(hasil.length === 0) {
        box.innerHTML = `[Searching] "${keyword}" tidak ditemukan.`;
    } else {
        box.innerHTML = `[Searching] Ditemukan ${hasil.length} Faskes:<br>` + 
            hasil.map(rs => `- ${rs.nama}`).join('<br>');
    }
}

function pemicuUrut() {
    const hasilUrut = sortingJarak(dataFaskes);
    box.innerHTML = "[Sorting] Urutan Faskes Terdekat:<br>" + 
        hasilUrut.map((rs, idx) => `${idx + 1}. ${rs.nama} (Jarak: ${rs.jarak} Km)`).join('<br>');
}

function pemicuNavigasi(metode) {
    if (animasiSedangBerjalan) return;

    const tujuan = document.getElementById("pilihTujuan").value;
    const namaTujuan = kamusNama[tujuan];
    let hasilCari = metode === 'BFS' ? ruteBFS("N0", tujuan) : ruteDFS("N0", tujuan);

    if (hasilCari) {
        box.innerHTML = `<strong>[Metode ${metode}]</strong><br>Sedang menyimulasikan algoritma di peta...`;
        // Oper operan data ke mesin animasi yang terpisah di bawah
        mainkanAnimasiPeta(hasilCari.jejakVisual, hasilCari.ruteAsli, metode, namaTujuan);
    } else {
        box.innerHTML = `[Metode ${metode}] Rute tidak ditemukan.`;
    }
}








// 7. VISUALISASI SISTEM DFS DAN BFS, ini hanya visual untuk pencarian dfs dan bfs



const kordinatPeta = {
    "N0": {x: 50, y: 85}, "J1": {x: 50, y: 70}, "J7": {x: 75, y: 70}, "N7": {x: 75, y: 85},
    "J2": {x: 50, y: 55}, "N1": {x: 55, y: 40}, "J3": {x: 35, y: 55}, "N2": {x: 35, y: 40},
    "J4": {x: 65, y: 55}, "N4": {x: 65, y: 40}, "J8": {x: 15, y: 55}, "N8": {x: 15, y: 40},
    "J5": {x: 50, y: 35}, "N5": {x: 43, y: 22}, "N3": {x: 57, y: 22}, "J6": {x: 30, y: 35},
    "N6": {x: 20, y: 15}, "J9": {x: 70, y: 35}, "N9": {x: 80, y: 15}
};

function initPeta() {
    const viz = document.getElementById("graph-visualizer");
    Object.keys(kamusNama).forEach(id => {
        const div = document.createElement("div");
        div.className = "node-circle";
        div.id = `viz-${id}`;
        div.innerText = id;
        div.title = kamusNama[id]; 
        if(kordinatPeta[id]) {
            div.style.left = `${kordinatPeta[id].x}%`;
            div.style.top = `${kordinatPeta[id].y}%`;
        }
        viz.appendChild(div);
    });
    setTimeout(gambarKabelPeta, 100);
}
initPeta();

function gambarKabelPeta() {
    const svgLayer = document.getElementById("svg-layer");
    svgLayer.innerHTML = "";
    const digambar = new Set(); 

    for (let nodeA in graphPeta) {
        for (let nodeB of graphPeta[nodeA]) {
            let ruteUnik = [nodeA, nodeB].sort().join("-");
            if (!digambar.has(ruteUnik)) {
                digambar.add(ruteUnik);
                const elA = document.getElementById(`viz-${nodeA}`);
                const elB = document.getElementById(`viz-${nodeB}`);
                if (elA && elB) {
                    const garis = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    garis.setAttribute("x1", elA.offsetLeft); garis.setAttribute("y1", elA.offsetTop);
                    garis.setAttribute("x2", elB.offsetLeft); garis.setAttribute("y2", elB.offsetTop);
                    garis.setAttribute("stroke", "#cbd5e1"); garis.setAttribute("stroke-width", "2");
                    garis.setAttribute("id", `line-${ruteUnik}`);
                    svgLayer.appendChild(garis);
                }
            }
        }
    }
}
window.addEventListener("resize", gambarKabelPeta);

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function resetWarna() {
    document.querySelectorAll(".node-circle").forEach(el => el.className = "node-circle");
    document.querySelectorAll("line").forEach(line => {
        line.setAttribute("stroke", "#cbd5e1"); line.setAttribute("stroke-width", "2");
    });
}
function warnai(id, status) {
    const el = document.getElementById(`viz-${id}`);
    if (el) { el.className = "node-circle"; if (status) el.classList.add(status); }
}
function warnaiKabel(nodeA, nodeB, color) {
    if (graphPeta[nodeA] && graphPeta[nodeA].includes(nodeB)) {
        let ruteUnik = [nodeA, nodeB].sort().join("-");
        const garis = document.getElementById(`line-${ruteUnik}`);
        if (garis) { garis.setAttribute("stroke", color); garis.setAttribute("stroke-width", "4"); }
    }
}

// Fungsi animasi utama
async function mainkanAnimasiPeta(jejak, ruteFinal, metode, namaTujuan) {
    animasiSedangBerjalan = true;
    resetWarna();

    // 1. Animasi Proses Komputer Mencari (Kuning/Biru)
    for (let i = 0; i < jejak.length; i++) {
        let node = jejak[i];
        warnai(node, "current");
        if (i > 0) warnaiKabel(jejak[i-1], node, "#fef08a");
        await sleep(350); // Jeda visual
        warnai(node, "visited");
    }

    // 2. Animasi Hasil Final (Hijau Beruntun)
    resetWarna();
    for (let i = 0; i < ruteFinal.length; i++) {
        let node = ruteFinal[i];
        warnai(node, "path");
        if (i > 0) warnaiKabel(ruteFinal[i-1], node, "#10b981");
        await sleep(200);
    }

    // 3. Output Teks Akhir
    const ruteTerbaca = ruteFinal.map(k => kamusNama[k]).join(" ➔ ");
    box.innerHTML = `<strong>[Metode ${metode}] Berhasil!</strong><br>Ambulans tiba di ${namaTujuan}.<br><br><strong>Rute Final:</strong><br><span style="color:#10b981;">${ruteTerbaca}</span>`;
    
    animasiSedangBerjalan = false;
}
