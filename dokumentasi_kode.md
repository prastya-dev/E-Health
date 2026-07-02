# Dokumentasi Kode: Struktur Data & Algoritma (Untuk Presentasi)
**Tema**: Aplikasi Pencarian Fasilitas Kesehatan (UNSIA)

Halo! Dokumen ini dibuat agar kita bisa dengan mudah menjelaskan *kodingan* (sintaks) aplikasi E-Health ini saat presentasi. Setiap bagian akan dijelaskan dengan perumpamaan sederhana (analogi) agar teman-teman dan audiens cepat paham.

---

## 1. Array of Objects (Data Mentah)
**Tujuan**: Menyimpan data rumah sakit.

```javascript
const facilitiesData = [
    { id: "N1", name: "RSUD PASAR MINGGU", distance: 0.85 },
    { id: "N2", name: "AJI WARAS KLINIK", distance: 1.8 }
];
```

**Penjelasan untuk Presentasi:**
- `const` artinya kita membuat kotak penyimpanan yang tidak bisa ditukar kotaknya.
- `[` dan `]` berarti **Daftar/Antrean** (Array).
- `{` dan `}` berarti **Benda/Objek**. 
- **Analogi**: Bayangkan *Array* itu seperti "Buku Kontak di HP". Setiap kontak (Objek) punya nama dan jarak. 
- **Contoh sederhana**:
  ```javascript
  // Daftar belanjaan
  const belanja = [
      { nama: "Apel", harga: 5000 },
      { nama: "Jeruk", harga: 3000 }
  ];
  ```

---

## 2. Struktur Data Graph (Peta Jalan)
**Tujuan**: Menghubungkan rumah sakit satu dengan yang lainnya membentuk jaring laba-laba.

```javascript
class HealthGraph {
    constructor() {
        this.adjList = new Map(); // Daftar jalan
    }
    addEdge(v, w) {
        this.adjList.get(v).push(w); // Jalan pergi
        this.adjList.get(w).push(v); // Jalan pulang
    }
}
```

**Penjelasan untuk Presentasi:**
- `class` itu seperti "Cetak Biru" (Blueprint) rumah.
- `Map()` itu buku catatan kosong.
- `push` artinya memasukkan/menambahkan data ke ujung antrean.
- **Analogi**: Bayangkan `v` dan `w` itu adalah dua kota, misalnya Jakarta dan Bogor. `addEdge(v,w)` berarti kita membangun jalan tol yang menghubungkan Jakarta ke Bogor, dan karena ini dua arah, kita juga catat Bogor ke Jakarta.

---

## 3. Merge Sort (Algoritma Pengurutan Jarak)
**Tujuan**: Mengurutkan rumah sakit dari yang terdekat.

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}
```

**Penjelasan untuk Presentasi:**
- `if (arr.length <= 1)` : Kalau datanya sisa satu, ya sudah gak perlu diurutin lagi.
- `slice` : Memotong data.
- **Analogi**: Ini seperti teknik "Divide and Conquer" (Pecah dan Taklukkan). Kalau disuruh mengurutkan 100 lembar kertas ujian berantakan, itu pusing. Jadi kita belah dua (50-50). Kalau masih pusing, belah dua lagi sampai sisa 1 lembar (gak perlu diurut). Kalau sudah, baru ditumpuk perlahan (digabung / *merge*) secara terurut.

---

## 4. Linear Search (Algoritma Pencarian)
**Tujuan**: Mencari nama rumah sakit atau layanan.

```javascript
for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.name.includes(keyword)) {
        results.push(item);
    }
}
```

**Penjelasan untuk Presentasi:**
- `for` : Perulangan. Melakukan hal yang sama berulang-ulang.
- `includes` : Cek apakah ada kata yang cocok.
- **Analogi**: Ibarat kita punya rak sepatu panjang. Kita mencari "sepatu merah". Kita mulai dari ujung kiri (`let i = 0`), kita lihat sepatunya (`item`), apakah warnanya merah (`includes`)? Kalau iya, ambil sepatunya (`push`). Kalau nggak, lanjut geser ke kanan (`i++`).

---

## 5. Breadth-First Search / BFS (Traversal Graf)
**Tujuan**: Mencari rumah sakit dengan mengecek yang paling dekat dulu, baru yang lebih jauh (meluas/melebar).

```javascript
const queue = [startNode];
while (queue.length > 0) {
    const current = queue.shift();
    // Proses current...
}
```

**Penjelasan untuk Presentasi:**
- `queue` : Antrean (*First In, First Out* - Siapa datang pertama, dia dilayani duluan).
- `shift()` : Memanggil orang paling depan di antrean.
- **Analogi**: Seperti gelombang air saat kita melempar batu ke danau. Airnya menyebar perlahan ke segala arah. Di kodingan, kita cek semua rumah sakit tetangga yang berjarak 1 langkah, baru kita cek yang berjarak 2 langkah.

---

## 6. Depth-First Search / DFS (Traversal Graf)
**Tujuan**: Menelusuri satu jalur sampai ujung mentok, baru putar balik.

```javascript
async function dfsHelper(nodeId) {
    visited.add(nodeId);
    
    for (const tetangga of neighbors) {
        if (!visited.has(tetangga)) {
            await dfsHelper(tetangga);
        }
    }
}
```

**Penjelasan untuk Presentasi:**
- Rekursif: Fungsi `dfsHelper` ini *memanggil dirinya sendiri* terus menerus.
- `visited` : Buku catatan tempat yang sudah pernah dikunjungi.
- **Analogi**: Seperti masuk ke dalam Labirin gelap. Kita jalan lurus terus menelusuri satu gang sampai nemu jalan buntu. Saat buntu, kita putar balik, lalu coba gang lainnya. 

---
**Tips Saat Presentasi:**
* Jika Dosen bertanya: "Kenapa menggunakan Merge Sort, kok tidak Bubble Sort?"
* Jawab: "Karena Merge Sort performanya sangat stabil walau data rumah sakitnya ada ribuan. Merge Sort punya Big O (N log N), sedangkan Bubble Sort lambat (N pangkat 2)."
