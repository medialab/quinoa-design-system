import React, {Component} from 'react';
import {v4 as genId} from 'uuid';
import '../../../src/themes/millet/bulma.theme.scss';
import icons from '../../../src/themes/millet/icons';
import {
  BigSelect,
  Button,
  Card,
  Checkbox,
  Column,
  Columns,
  Control,
  Delete,
  Dropdown,
  DropZone,
  Field,
  HelpPin,
  Icon,
  Input,
  Label,
  Level,
  Navbar,
  StatusMarker,
  Tab,
  TabLink,
  TabList,
  Tabs,
  TextArea,
  Title,
} from '../../../src/components';

import ReactTooltip from 'react-tooltip';


const mockResourcesIds = [];
const mockResourcesNbr = 20;
for (let i = 0; i < mockResourcesNbr; i++) mockResourcesIds.push(genId());
const mockNames = [
'Baleric Shearwater',
'Barn Owl',
'Barnacle Goose',
'Bar-tailed Godwit',
'Bean Goose',
"Bewick's Swan",
'Black Brant',
'Black Guillemot',
'Black Redstart',
'Black Swan',
'Blackbird',
'Blackcap',
'Black-headed Gull',
'Black-necked Grebe',
'Black-tailed Godwit',
'Black-throated Diver',
'Blue Tit',
'Brambling',
'Brent Goose (dark-bellied)',
'Brent Goose (light-bellied)',
'Buff-breasted Sandpiper',
'Bullfinch',
'Buzzard',
  <span key="bla">Coulibaly, P., Anctil, François, & Bobée, B. (1999). Prévision hydrologique par réseaux de neurones artificiels: état de l’art. <i>Canadian Journal of Civil Engineering</i>, 26(3), 293–304.</span>,
];
const resourceTypes = ['bib', 'image', 'video', 'embed', 'webpage', 'table', 'glossary'];

const mockResources = mockResourcesIds.map(id => {
  const title = mockNames[parseInt(Math.random() * mockNames.length, 10)];
  const type = resourceTypes[parseInt(Math.random() * resourceTypes.length, 10)];
  return {
    id,
    metadata: {
      title,
      type,
      creators: [],
      description: 'description',
      source: 'source'
    },
    data: {
     id: 'unique_string-1219205',
     type: 'book',
     title: 'Book Title',
     author: [
         {
                 family: 'de las Casas',
                 given: 'Bartolomé',
         },
         {
                 family: 'King',
                 given: 'Rev. Martin Luther Jr., Ph.D.',
         }
    ],
     arbitraryField: 'An example arbitrary field with arbitrary data. This field will be ignored by the CSL Processor.'
    }
  };
});

export default class SectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabMode: 'library',
      stylesMode: 'gui',
      sizeActive: false,
      colorEdited: false,
      tabsAreCollapsed: false,
      sortVisible: false,
      filterVisible: false,
      mainColumnMode: 'edition',
      sections: [
        {
          title: 'Chapitre 1',
          subtitle: 'First few words ...',
          lockStatus: 'locked',
          statusMessage: 'Edited by Fania'
        },
        {
          title: 'Section 2',
          subtitle: 'First few words ...',
          lockStatus: 'active',
          statusMessage: 'Edited by you'
        },
        {
          title: 'Chapitre 2',
          subtitle: 'First few words ...',
          lockStatus: 'open',
        },
        {
          title: 'Chapitre 3',
          subtitle: 'First few words ...',
          lockStatus: 'open',
        },
      ],
      activeAuthors: [
        {
          message: 'You (Rawbin) are editing the summary',
          editable: true
        },
        {
          message: 'Fania is editing the section "Chapitre 1"'
        },
        {
          message: 'Fred is editing the design of the story'
        }
      ],
    };
  }

  setTabMode = tabMode => this.setState({tabMode});

  collapseTabs = () => {
    this.setState({tabsAreCollapsed: !this.state.tabsAreCollapsed});
  }

  renderAside = () => {
    const {
      state: {
        tabMode,
        tabsAreCollapsed,
        sortVisible,
        filterVisible,
        mainColumnMode,
        sections,
      }
    } = this;
    if (tabsAreCollapsed) {
      return null;
    }
    switch (tabMode) {
      case 'library':
        return (
          <Column>
            <Field hasAddons>
              <Control>
                <Input placeholder="Find a resource" />
              </Control>
              <Control>
                <Button>Search</Button>
              </Control>
            </Field>
            <Level>
              <Dropdown
                onToggle={() => this.setState({sortVisible: !sortVisible, filterVisible: false})}
                isActive={sortVisible}
                value={{id: 'lastmod', label: 'last modification'}}
                options={[
                  {
                    id: 'lastmod',
                    label: 'last modification'
                  },
                  {
                    id: 'creation',
                    label: 'creation'
                  },
                  {
                    id: 'title',
                    label: 'title'
                  },
                ]}>
                Sort
              </Dropdown>
              <Dropdown
                onToggle={() => this.setState({filterVisible: !filterVisible, sortVisible: false})}
                isActive={filterVisible}
                value={{id: 1, label: '1 rem'}}
                options={[
                    {
                      id: 'images',
                      label: <Field>
                        <Control>
                          <Checkbox checked>Images</Checkbox>
                        </Control>
                      </Field>
                    },
                    {
                      id: 'videos',
                      label: <Field>
                        <Control>
                          <Checkbox>Videos</Checkbox>
                        </Control>
                      </Field>
                    },
                    {
                      id: 'all',
                      label: 'Select all'
                    }
                  ]}>
                  Filter
              </Dropdown>
            </Level>
            <Level>
              <Button isFullWidth onClick={() => this.setState({mainColumnMode: 'newresource'})} isColor={mainColumnMode === 'new' ? 'primary' : 'info'}>
                New resource
              </Button>
            </Level>
            {
                mockResources.map(resource => {
                  return (
                    <Column style={{margin: '0 0 1rem 0', padding: 0}} key={resource.id}>
                      <Card
                        key={resource.id}
                        bodyContent={
                          <div>
                            <Columns>
                              <Column isSize={2}>
                                <Icon isSize="medium" isAlign="left">
                                  <img src={icons[resource.metadata.type].black.svg} />
                                </Icon>
                              </Column>

                              <Column isSize={8}>
                                {resource.metadata.title}
                              </Column>

                              <Column isSize={2}>
                                <StatusMarker
                                  lockStatus={'open'}
                                  statusMessage={'open'} />
                              </Column>
                            </Columns>
                            <Columns>
                              <Column isOffset={2} isSize={10}>
                                <Button data-for="card-action" data-tip={'drag this card to the editor'}>
                                  <Icon isSize="small" isAlign="left">
                                    <img src={icons.move.black.svg} />
                                  </Icon>
                                </Button>
                                <Button onClick={() => this.setState({mainColumnMode: 'editresource'})} data-for="card-action" data-tip={'settings'}>
                                  <Icon isSize="small" isAlign="left">
                                    <img src={icons.settings.black.svg} />
                                  </Icon>
                                </Button>
                                <Button data-for="card-action" data-tip={'delete this resource'}>
                                  <Icon isSize="small" isAlign="left">
                                    <img src={icons.remove.black.svg} />
                                  </Icon>
                                </Button>
                                <Button data-for="card-action" data-tip={'use as cover image'}>
                                  <Icon isSize="small" isAlign="left">
                                    <img src={icons.cover.black.svg} />
                                  </Icon>
                                </Button>
                              </Column>
                            </Columns>
                            <ReactTooltip
                              place="right"
                              effect="solid"
                              id="card-action" />
                          </div>
                          } />
                    </Column>
                  );
                })
              }
            <Level>
              <DropZone>
                 Drop files to include new resources in your library (images, tables, bibliographies)
              </DropZone>
            </Level>
          </Column>
        );
      case 'summary':
      default:
        return (
          <Column>
            {
                  sections.map((section, index) => {
                    return (
                      <Column style={{margin: '0 0 1rem 0', padding: 0}} key={index}>
                        <Card
                          bodyContent={
                            <div>
                              <Columns>
                                <Column isSize={2}>
                                  <Icon isSize="medium" isAlign="left">
                                    <img src={icons.section.black.svg} />
                                  </Icon>
                                </Column>

                                <Column isSize={8}>
                                  {section.title}
                                </Column>

                                <Column isSize={2}>
                                  <StatusMarker
                                    lockStatus={section.lockStatus}
                                    statusMessage={section.statusMessage} />
                                </Column>
                              </Columns>
                              <Columns>
                                <Column isOffset={2} isSize={10}>
                                  <Button data-for="card-action" data-tip={'drag this card to the editor'}>
                                    <Icon isSize="small" isAlign="left">
                                      <img src={icons.move.black.svg} />
                                    </Icon>
                                  </Button>
                                  <Button data-for="card-action" data-tip={'settings'}>
                                    <Icon isSize="small" isAlign="left">
                                      <img src={icons.settings.black.svg} />
                                    </Icon>
                                  </Button>
                                  <Button data-for="card-action" data-tip={'delete this resource'}>
                                    <Icon isSize="small" isAlign="left">
                                      <img src={icons.remove.black.svg} />
                                    </Icon>
                                  </Button>

                                </Column>
                                <ReactTooltip
                                  place="right"
                                  effect="solid"
                                  id="card-action" />
                              </Columns>
                            </div>
                          } />
                      </Column>
                  );
                  })
                }
          </Column>
        );
    }
  }

  renderMain = () => {
    const renderResourceForm = () => {
      return (<div>
        <Columns>
          <Column>
            <Field>
              <Control>
                <Label>
                    Url of the video
                  <HelpPin place="right">
                      Explanation about the video url
                  </HelpPin>
                </Label>
                <Input type="text" placeholder="Video url" />
              </Control>
            </Field>
          </Column>
          <Column>
            <Title isSize={5}>
                  Preview
            </Title>
            <iframe
              src="https://www.youtube.com/embed/QHDRRxKlimY?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allow="autoplay; encrypted-media"
              allowFullScreen />
          </Column>
        </Columns>
        <Level />
        <Columns>
          <Column>
            <Field>
              <Control>
                <Label>
                      Title of the video
                  <HelpPin place="right">
                      Explanation about the video title
                  </HelpPin>
                </Label>
                <Input type="text" placeholder="Video title" />
              </Control>
            </Field>
            <Field>
              <Control>
                <Label>
                    Source of the video
                  <HelpPin place="right">
                      Explanation about the video source
                  </HelpPin>
                </Label>
                <Input type="text" placeholder="Video source" />
              </Control>
            </Field>
          </Column>
          <Column>
            <Field>
              <Control>
                <Label>
                    Description of the video
                  <HelpPin place="right">
                      Explanation about the video description
                  </HelpPin>
                </Label>
                <TextArea type="text" placeholder="Video description" />
              </Control>
            </Field>
          </Column>
        </Columns>
      </div>);
    };
    switch (this.state.mainColumnMode) {
      case 'newresource':
        return (
          <div>
            <Level />
            <Title isSize={2}>
              <Columns>
                <Column isSize={11}>
                  Create a new resource
                </Column>
                <Column>
                  <Delete onClick={
                    () => this.setState({mainColumnMode: 'list'})
                  } />
                </Column>
              </Columns>
            </Title>
            <BigSelect
              activeOptionId={this.state.activeOptionId}
              onChange={activeOptionId => this.setState({activeOptionId})}
              options={
                resourceTypes.map(type => ({
                  id: type,
                  label: type,
                  iconUrl: icons[type].black.svg
                }))
              } />
            {renderResourceForm()}
          </div>
        );
      case 'editresource':
        return (
          <div>
            <Level />
            <Title isSize={2}>
              <Columns>
                <Column isSize={11}>
                  Edit video
                </Column>
                <Column>
                  <Delete onClick={
                    () => this.setState({mainColumnMode: 'list'})
                  } />
                </Column>
              </Columns>
            </Title>
            {renderResourceForm()}
          </div>
        );
      case 'edit':
      default:
        return <img src={require('../../mockAssets/mock-section-editor.png')} />;
    }
  }

  render = () => {
    const {
      state: {
        tabMode,
        tabsAreCollapsed
      },
      setTabMode,
      renderAside,
      renderMain,
      collapseTabs,
    } = this;
    return (
      <div>
        <Navbar
          brandImage={icons.fonioBrand.svg}
          isOpen={false}
          isFixed

          locationBreadCrumbs={[
            {
              href: '/',
              content: <a>Scube 2018</a>
            },
            {
              href: '/',
              content: <a>My story</a>,
              isActive: false
            },
            {
              href: '/',
              content: <a>Section 2</a>,
              isActive: true
            },
          ]}

          menuOptions={[
            {
              href: '/',
              content: <span>Summary</span>,
            },
            {
              href: '/',
              content: <span>Library</span>
            },
            {
              href: '/',
              content: <span>Design</span>,
              lockStatus: 'locked',
              statusMessage: 'Edited by Filipe',
            }
          ]}
          actionOptions={[{
            content: <button className="button">Export</button>
          },
          {
            content: <button className="button">FR</button>
          }
          ]}
          profile={{
            imageUri: 'https://via.placeholder.com/48x48'
          }} />
        <Level />
        <Columns isFullHeight>
          <Column isSize={tabsAreCollapsed ? 1 : '1/4'}>
            <Tabs isBoxed isFullWidth>
              <TabList>
                {!tabsAreCollapsed && <Tab onClick={() => setTabMode('library')} isActive={tabMode === 'library'}><TabLink>Library</TabLink></Tab>}
                {!tabsAreCollapsed && 'collapse' && <Tab onClick={() => setTabMode('summary')} isActive={tabMode === 'summary'}><TabLink>Summary</TabLink></Tab>}
                <Tab onClick={() => collapseTabs()} isActive={tabsAreCollapsed}><TabLink>{tabsAreCollapsed ? '▶' : '◀'}</TabLink></Tab>
              </TabList>
            </Tabs>
            {renderAside()}
          </Column>
          <Column isSize={'fullwidth'}>
            {renderMain()}
          </Column>
        </Columns>
      </div>
    );
  }
}
