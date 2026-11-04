import { site } from '../config/site';

export function guideSchema(name: string, id: string, teammates: boolean, title: string, description: string) {
  const guideUrl = `${site.url}/pokemon/${id}/`;
  const currentUrl = teammates ? `${guideUrl}best-teammates/` : guideUrl;
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Pokémon guides', item: `${site.url}/pokemon/` },
    ...(teammates ? [{ '@type': 'ListItem', position: 2, name: `${name} build`, item: guideUrl }] : []),
    { '@type': 'ListItem', position: teammates ? 3 : 2, name: teammates ? 'Teammates' : `${name} build`, item: currentUrl },
  ];
  return { '@graph': [
    { '@type': 'WebApplication', name: title, description, url: currentUrl, applicationCategory: 'EntertainmentApplication', operatingSystem: 'Any' },
    { '@type': 'BreadcrumbList', itemListElement: items },
  ] };
}
