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

- npx shadcn-ui@latest init
  - -> Y -> Default -> Neutral Enter -> Y -> tab zmien na .ts -> Enter -> Enter -> Y
  * dodaje sie funkcja "cn" w lib/utils.ts do łaczenia class tailwind z reszta
    i nadgralo tailwind.config.ts

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
