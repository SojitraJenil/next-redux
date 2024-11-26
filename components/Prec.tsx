import { useState } from "react";
import Navbar from "./Navbar";

const Prec = () => {
  const A = [1, 2, 3, 4];

  // Using reduce to calculate the sum of all elements in the array
  const sum = A.reduce((acc, current) => {
    console.log("acc :>> ", acc);
    console.log("current :>> ", current);
    return acc + current;
  }, 0);

  const initialTodos = [
    { id: 1, title: "Todo 1", complete: false },
    { id: 2, title: "Todo 2", complete: false },
  ];

  const features = [
    {
      title: "Server-Side Rendering (SSR)",
      description:
        "SSR improves performance and SEO by rendering pages on the server for each request.",
      code: `export async function getServerSideProps(context) {
  const res = await fetch(\`https://api.example.com/data\`);
  const data = await res.json();

  return { props: { data } };
}

function SSRPage({ data }) {
  return <div>Server-side rendered data: {JSON.stringify(data)}</div>;
}

export default SSRPage;`,
    },
    {
      title: "Static Site Generation (SSG)",
      description:
        "SSG generates static HTML at build time for faster page loads.",
      code: `export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return { props: { data } };
}

function SSGPage({ data }) {
  return <div>Statically generated data: {JSON.stringify(data)}</div>;
}

export default SSGPage;`,
    },
    {
      title: "Incremental Static Regeneration (ISR)",
      description:
        "ISR allows updating static pages without rebuilding the entire site.",
      code: `export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return { props: { data }, revalidate: 60 };
}

function ISRPage({ data }) {
  return <div>ISR data (updates every 60 seconds): {JSON.stringify(data)}</div>;
}

export default ISRPage;`,
    },
    {
      title: "API Routes",
      description:
        "API Routes enable creating serverless API endpoints within Next.js.",
      code: `export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API route!' });
}`,
    },
    {
      title: "File-based Routing",
      description:
        "Next.js automatically creates routes based on the file structure in the pages directory.",
      code: `// Example file structure:
pages/
├── index.js         // Routes to /
├── about.js         // Routes to /about
└── blog/
    ├── index.js     // Routes to /blog
    └── [slug].js    // Routes to /blog/:slug`,
    },
    {
      title: "Dynamic Routing",
      description:
        "Dynamic routing supports parameter-based routes for dynamic content.",
      code: `import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
}`,
    },
    {
      title: "Image Optimization",
      description:
        "Next.js provides automatic image optimization and responsive image generation.",
      code: `import Image from 'next/image';

function OptimizedImage() {
  return (
    <Image
      src="/images/profile.jpg"
      alt="Profile picture"
      width={500}
      height={500}
      layout="responsive"
    />
  );
}`,
    },
    {
      title: "Font Optimization",
      description:
        "Next.js automatically optimizes and loads custom fonts efficiently.",
      code: `// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;`,
    },
    {
      title: "Code Splitting",
      description:
        "Next.js automatically splits code into smaller chunks for faster loading.",
      code: `// Built-in feature, no specific code is required.`,
    },
    {
      title: "Fast Refresh",
      description:
        "Fast Refresh provides instant feedback during development without losing component state.",
      code: `// Built-in feature, no specific code is required.`,
    },
    {
      title: "TypeScript Support",
      description:
        "Next.js includes built-in TypeScript support without additional configuration.",
      code: `import { GetServerSideProps, NextPage } from 'next';

interface Props {
  message: string;
}

const TypeScriptPage: NextPage<Props> = ({ message }) => {
  return <h1>{message}</h1>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return { props: { message: 'Hello from TypeScript!' } };
};

export default TypeScriptPage;`,
    },
    {
      title: "CSS Support",
      description:
        "Next.js supports various styling options out of the box, including CSS Modules.",
      code: `// components/Button.js
import styles from './Button.module.css';

function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

export default Button;`,
      additionalCode: `/* Button.module.css */
.button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
}`,
    },
    {
      title: "Environment Variables",
      description:
        "Next.js provides easy configuration and use of environment variables.",
      code: `// pages/api/db-example.js
export default function handler(req, res) {
  res.status(200).json({ dbConnection: process.env.DATABASE_URL });
}`,
    },
    {
      title: "Automatic Prefetching",
      description:
        "Next.js automatically prefetches links in the viewport for faster transitions.",
      code: `import Link from 'next/link';

function NavBar() {
  return (
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </nav>
  );
}`,
    },
    {
      title: "Internationalization (i18n)",
      description:
        "Next.js provides built-in support for multiple languages and locales.",
      code: `// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },
}

// pages/index.js
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { locale } = router;

  return <h1>{locale === 'en' ? 'Welcome' : locale === 'fr' ? 'Bienvenue' : 'Willkommen'}</h1>;
}`,
    },
    {
      title: "AMP Support",
      description:
        "Next.js enables creating Accelerated Mobile Pages (AMP) for better mobile performance.",
      code: `// pages/amp-example.js
export const config = { amp: true };

function AmpPage() {
  return <h1>This is an AMP page</h1>;
}

export default AmpPage;`,
    },
    {
      title: "Custom App and Document",
      description:
        "Next.js allows customizing the application initialization and HTML structure.",
      code: `// pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;`,
      additionalCode: `// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;`,
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Next.js Features Explained</h1>
        <div className="flex">
          {/* Feature Navigation */}
          <ul className="w-1/4 border-r">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 ${
                  selectedFeature.title === feature.title ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedFeature(feature)}
              >
                {feature.title}
              </li>
            ))}
          </ul>

          {/* Feature Details */}
          <div className="w-3/4 p-4">
            <h2 className="text-xl font-semibold mb-2">
              {selectedFeature.title}
            </h2>
            <p className="mb-4">{selectedFeature.description}</p>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
              <code>{selectedFeature.code}</code>
            </pre>
          </div>
        </div>
      </div>
      <p> const A = [1, 2, 3, 4];</p>
      <div className="container bg-slate-600 text-white py-4 ps-5">
        <div className="map">
          <h4>Map:</h4>
          {/* Map method to display each element in the array */}
          {A.map((a) => {
            return <div key={a}>{a}</div>;
          })}
        </div>
        <br />
        <hr />
        <div className="filter">
          <h4>Filter (values == 2):</h4>
          {/* Filter method to display elements less than or equal to 2 */}
          {A.filter((val) => val <= 2).map((val) => (
            <div key={val}>{val}</div>
          ))}
        </div>
        <br />
        <hr />
        <div className="reduce">
          <h4>Reduce (Sum of all elements):</h4>
          {/* Display the sum calculated using reduce */}
          <div>{sum}</div>
        </div>
      </div>
    </>
  );
};

export default Prec;
