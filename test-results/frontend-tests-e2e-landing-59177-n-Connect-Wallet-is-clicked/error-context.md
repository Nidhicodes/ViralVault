# Page snapshot

```yaml
- generic [active]:
  - alert [ref=e1]
  - dialog "Failed to compile" [ref=e4]:
    - generic [ref=e5]:
      - heading "Failed to compile" [level=4] [ref=e7]
      - generic [ref=e8]:
        - generic [ref=e10]: "./app/page.tsx:5:0 Module not found: Can't resolve '@/hooks/useWallet' 3 | import Link from 'next/link'; 4 | import { TrendingUp, Zap, DollarSign, Users, Twitter, Share2, ChevronRight } from 'lucide-react'; > 5 | import { useWallet } from '@/hooks/useWallet'; 6 | 7 | export default function ViralVaultLanding() { 8 | const { address, isConnected, connect, disconnect } = useWallet(); https://nextjs.org/docs/messages/module-not-found"
        - contentinfo [ref=e11]:
          - paragraph [ref=e12]: This error occurred during the build process and can only be dismissed by fixing the error.
```