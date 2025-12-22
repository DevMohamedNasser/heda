import Link from 'next/link';
import React from 'react'

const hadithBooks = [
  { name: "📘 صحيح البخاري", slug: "sahih-bukhari" },
  { name: "📗 صحيح مسلم", slug: "sahih-muslim" },
  { name: "📕 جامع الترمذي", slug: "al-tirmidhi" },
  { name: "📙 سنن أبي داود", slug: "abu-dawood" },
  { name: "📒 سنن ابن ماجه", slug: "ibn-e-majah" },
  { name: "📓 سنن النسائي", slug: "sunan-nasai" },
  { name: "📔 مسند أحمد", slug: "musnad-ahmad" },
  { name: "📚 مشكاة المصابيح", slug: "mishkat" },
  { name: "📙 السلسلة الصحيحة", slug: "al-silsila-sahiha" },
];

export default function Narrators() {
  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-16">
      {hadithBooks.map((book) => (
        <Link key={book.slug} href={`/more/narrators/${book.slug}`}>
            <div
          
          className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 border hover:shadow-lg cursor-pointer transition"
          
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {book.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            تصفح أحاديث هذا الكتاب
          </p>
        </div>
        </Link>
      ))}
    </div>
  )
}
