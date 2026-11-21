// Hizmetler başlığının arkasında dönen kamera arkası kareleri (site sahibinin fotoğrafları).
// pos: telefondaki object-position; tabela/kişi kadrajda kalsın diye.
import type { ImageMetadata } from 'astro';
import tekinoglu from '../assets/img/kamera-arkasi-tekinoglu.jpg';
import bera from '../assets/img/kamera-arkasi-bera.jpg';
import mutfak from '../assets/img/kamera-arkasi-mutfak.jpg';
import izgara from '../assets/img/kamera-arkasi-izgara.jpg';
import oymapinar from '../assets/img/kamera-arkasi-oymapinar.jpg';
import prive from '../assets/img/kamera-arkasi-prive.jpg';

// Başlık kareleri: telefonda tam genişlik, masaüstünde şeritte ekran yüksekliğinde (global.css)
export const HERO_SIZES = '(min-width: 48rem) 60vw, 100vw';

type L = 'tr' | 'en' | 'ru' | 'uk';
const S: { src: ImageMetadata; pos: string; alt: Record<L, string> }[] = [
  {
    src: tekinoglu,
    pos: '50% 0%',
    alt: {
      tr: 'Kamera arkası: Tekinoğlu Kuyumculuk açılışında balonlarla süslenmiş mağaza cephesine çevrilmiş kafesli kamera',
      en: 'Behind the camera: a caged camera pointed at the balloon-decorated shop front at the Tekinoğlu Kuyumculuk opening',
      ru: 'За кадром: камера в клетке направлена на украшенный шарами фасад на открытии Tekinoğlu Kuyumculuk',
      uk: 'За кадром: камера в клітці спрямована на прикрашений кулями фасад на відкритті Tekinoğlu Kuyumculuk',
    },
  },
  {
    src: bera,
    pos: '50% 38%',
    alt: {
      tr: 'Kamera arkası: Bera Alanya’da otel tanıtımı ve Reels çekimi, kameranın karşısında beyaz ceketli şef',
      en: 'Behind the camera: hotel promo and Reels shoot at Bera Alanya, a chef in a white jacket facing the camera',
      ru: 'За кадром: съёмка промо отеля и Reels в Bera Alanya, шеф в белом кителе перед камерой',
      uk: 'За кадром: зйомка промо готелю та Reels у Bera Alanya, шеф у білому кітелі перед камерою',
    },
  },
  {
    src: mutfak,
    pos: '50% 55%',
    alt: {
      tr: 'Kamera arkası: bir işletmenin üretim mutfağında tripod üzerindeki kamera ve ışık standı',
      en: 'Behind the camera: a camera on a tripod and a light stand in a business’s production kitchen',
      ru: 'За кадром: камера на штативе и стойка света на производственной кухне',
      uk: 'За кадром: камера на штативі та стійка світла на виробничій кухні',
    },
  },
  {
    src: izgara,
    pos: '94% 45%',
    alt: {
      tr: 'Kamera arkası: bir restoranda közde pişen etlerin önünde gimbal üzerindeki kamerayla çekim yapan kameraman',
      en: 'Behind the camera: a camera operator filming with a gimbal in front of meat cooking over charcoal in a restaurant',
      ru: 'За кадром: оператор снимает на стабилизатор мясо на углях в ресторане',
      uk: 'За кадром: оператор знімає на стабілізатор м’ясо на вугіллі в ресторані',
    },
  },
  {
    src: oymapinar,
    pos: '50% 45%',
    alt: {
      tr: 'Kamera arkası: Manavgat Oymapınar’da çimenlere çömelip gelin ile damadı fotoğraflayan Necip Bozdemir',
      en: 'Behind the camera: Necip Bozdemir crouching on the grass to photograph a couple at Oymapınar, Manavgat',
      ru: 'За кадром: Неджип Боздемир фотографирует пару в Оймапынаре, Манавгат',
      uk: 'За кадром: Неджип Боздемір фотографує пару в Оймапинарі, Манавгат',
    },
  },
  {
    src: prive,
    pos: '50% 40%',
    alt: {
      tr: 'Kamera arkası: Prive Alanya’da düğün klibi ve Reels çekimi, gimbal üzerindeki kamerayla çekilen çift',
      en: 'Behind the camera: wedding clip and Reels shoot at Prive, Alanya, a couple filmed on a gimbal',
      ru: 'За кадром: съёмка свадебного клипа и Reels в Prive, Алания',
      uk: 'За кадром: зйомка весільного кліпу та Reels у Prive, Аланія',
    },
  },
];

// Düğün başlığı: yalnız düğün kareleri (Oymapınar, Prive)
export const WEDDING_SLIDES = (lang: L) => BTS_SLIDES(lang).filter((s) => s.src === oymapinar || s.src === prive);
export const BTS_SLIDES = (lang: L) => S.map((s) => ({ src: s.src, pos: s.pos, alt: s.alt[lang] }));
