CTRL+SHIFT+P - reload

# TWORZENIE PROJEKTU

- Stworzyc katalog i przeciagnac do VSC
- npx create-next-app@latest w terminal, a "project named" dać . (kropka - tak samo jak nasz katalog)
- npm run dev

# ESLINT + PRETTIER CONFIG

- npm install eslint-config-standard
  - w .eslintrc.json:
  ```
  {
  "extends": [
    "next/core-web-vitals",
    "standard",
    "plugin:tailwindcss/recommended",
    "prettier"
  ]
  }
  ```
- npm install eslint-plugin-tailwindcss
- npm install eslint-config-prettier

- npm run lint

Pluginy do VSC:

- ESLint - Microsoft
- Prettier - Prettier

* npm install prettier
  - i w settings.json:
  ```
  {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.singleQuote": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit", //?(true) vsc sam zamienia
  "source.addMissindImports": "explicit" //?(true) - nie dziala
  },
  "[typescriptreact]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  }
  ```

# Shadcn

## instalacja

- npx shadcn-ui@latest init
  - -> Y -> Default -> Neutral Enter -> Y -> tab zmien na .ts -> Enter -> Enter -> Y
  * dodaje sie funkcja "cn" w lib/utils.ts do łaczenia class tailwind z reszta
    i nadgralo tailwind.config.ts

## uzywanie

- dodaje sie biblioteka lucide-react i tam jest {Medal}
- npx shadcn-ui@latest add button (laduje w components/ui/button.tsx)

## globals.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
:root {
  height: 100%;
}
```

Plugin do VSC:

- TailwindCSS Intellisense - TailwindLabs - do podpowiedzi o tailwind

# AppRouter

- **normalne** katalogi działaja jak podstrony app/example/page.tsx -> localhost:3000/example

```
const ExamplePage = () => {
return <div>ExamplePage</div>;
};
export default ExamplePage;
```

- dynamiczne katalogi **[id]** app/users/[id]/page.tsx mozemy sie dostac poprzez params.id przekazywane przez props np. localhost:3000/users/123 lub localhost:3000/users/345

```
const IdPage = ({ params }: { params: { id: string } }) => {
  return <div>Id: {params.id}</div>;
};

export default IdPage;
```

- katalogi w **normalnych nawiasach** (marketing) są pomijane i tworzy sie w nich layout.tsx (komponent MarketingLayout) i tam przez children dostajemy sie do podkatalogów normalnych <br>
  służa do tworzenia układów wielokrotnego użytku

```
layout.tsx - w katalogu (marketing)

const MarketingLayout = ({
  children,
}: {
  children : React.ReactNode;
}) => {
  return <div>
            <div>
              This is navbar
            </div>
           {children} //wyswietli podstrony (marketing)/something/page.tsx juz napisane normalnie nie w nawiasach
         </div>
      // <div>Marketing Layout</div>;   - wyswietli zawsze Marketing Layout

};

export default MarketingLayout;
```

- katalogi **underscore (marketing)/\_components** - kompletne wykluczenie z Routera

- route API <br>

  - app/users/route.ts

  ```
  import { NextResponse } from 'next/server';

  export function GET() {
    return NextResponse.json({
      hello: 'trello',
    });
  }

    export function POST() {
    return NextResponse.json({
      hello: 'trello',
    });
  }
  ```

# GITHub

## założyć repo

```
git init
git add .
git commit -m "marketing page"
git branch -M main
git remote add origin https://github.com/grekooss/trello-nextjs.git
git push -u origin main
```

## przegladanie i dodawanie pod okreslona nazwa repo

https://git-scm.com/book/pl/v2/Podstawy-Gita-Praca-ze-zdalnym-repozytorium

```
git remote -v
git remote add pb https://github.com/paulboone/ticgit
```

## klonowanie

```
git clone https://github.com/grekooss/trello-nextjs.git

npm i
```

## branch

```
git branch authentication
git checkout authentication
```

# IMPORT czcionek

```
import { cn } from '@/lib/utils';

import localFont from 'next/font/local';

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
});

      <div
        className={cn(
          'flex flex-col items-center justify-center',
          headingFont.className
        )}
      >
```

```
import { Poppins } from 'next/font/google';

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

      <div
        className={cn(
          'mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
          textFont.className
        )}
      >
```

# Tworzenie siteConfig

- zakładamy katalog config z plikiem site.ts w głownym drzewie

```
export const siteConfig = {
  name: 'Taskify',
  description: 'Collaborate, manage projects and reach new productivity peaks',
};
```

- wciagamy to w Metadane do głownego layout.tsx

```
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // jak na innych stronach - My-Organization | Taskify
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
};
```

# CLERK authentication

- tworzymy plik .env (dlatego tutaj bo prisma uzywa tego pliku) wykluczamy go w gitignore i wklejamy tam klucze
- npm i @clerk/nextjs
- nie wrapujemy w glownym layout.tsx - tworzymy katalog (platform) i tam plik layout.tsx (PlatformLayout) a to dlatego ze nie chcemy calej apki autentykowac
- tworzymy plik middleware.ts i tam dodajemy publicRoutes na ["/"]

- zeby nie przechodzilo do strony marketing jak mamy wybrana oranizacje

```
export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = '/select-org';

      if (auth.orgId) {
        path = `/organiztion/${auth.orgId}`;
      }
      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/select-org') {
      const orgSelection = new URL('/select-org', req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});
```

- tworzymy sign-in sign-up katalogi

(platform)/protected/page.tsx
Przyklad server component:

```
import { auth, currentUser } from '@clerk/nextjs';

const ProtectedPage = async () => {
  const user = await currentUser();
  const { userId } = auth();

  return (
    <div>
      User: {user?.firstName}
      UserId: {userId}
    </div>
  );
};

export default ProtectedPage;
```

Przyklad user component:

```
'use client';

import { useAuth, useUser } from '@clerk/nextjs';

const ProtectedPage = () => {
  const { userId } = useAuth();
  const { user } = useUser();

  return (
    <div>
      User: {user?.firstName}
      UserId: {userId}
    </div>
  );
};

export default ProtectedPage;
```

- Uzycie UserButton:

```
import { UserButton } from '@clerk/nextjs';

const ProtectedPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default ProtectedPage;
```
