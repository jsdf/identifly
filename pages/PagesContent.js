import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const H1 = (props) => <Text style={styles.title}>{props.children}</Text>;
const H2 = (props) => <Text style={styles.subtitle}>{props.children}</Text>;
const I = (props) => <Text style={styles.italic}>{props.children}</Text>;
const P = (props) => <Text style={styles.paragraph}>{props.children}</Text>;
const BR = () => <View style={styles.br} />;
const TableRow = (props) => <Text>{props.children}</Text>;

export const AckContent = () => (
  <View>
    <H1>Acknowledgements</H1>
    <P>This field guide has been produced in response to a request from one of the traditional owners of Kakadu National Park to have more information on the dragonflies and damselflies of the park available to visitors.  It is based on fieldwork and photography, undertaken mainly at the park, by Jenny Davis, Caroline Camilleri and Kevin McAlpine, in 1998, and John and Karly Hawking in 2001. </P>
    <P>This app was built by James Friend with assistance from Dora Kojevnikov. </P>

    <P>The facilities and logistic support provided by the Environmental Research Institute of the Supervising Scientist (eriss) at Jabiru, the School of Environmental Science, Murdoch University (Perth, WA), the Murray Darling Freshwater Research Centre and the CRC for Freshwater Ecology (Albury, NSW) and the School of Environment/RIEL, Charles Darwin University (Darwin, NT) are all gratefully acknowledged. </P>
  </View>
);

export const IntroContent = () => (
  <View>
    <H1>Introduction</H1>
    <P>The bright colours, glistening wings and aerial gymnastics of the dragonflies and damselflies of northern Australia means that they rarely go unnoticed by the visitors and residents of Australia’s tropical towns, communities and national parks.  In fact, the city of Darwin, the largest city in what is known as the Top End of the Northern Territory, has a dragonfly as it’s logo. Most of the fieldwork for this field guide was undertaken in Kakadu National Park, approximately 170kms SE of Darwin.  However, many of the species included here occur throughout northern Australia, including the Kimberley region of Western Australia and far north Queensland. Some species occur throughout the tropical regions of Asia. </P>

    <P>The scientific basis for this work are the keys and descriptions of Australian dragonflies published in Watson et al. (1991) and Theischinger & Hawking (2012).  These important reference works will still need to be consulted where accurate identifications are required.  However, there are many situations where a field guide is useful, and it is for these instances that this app has been prepared. </P>

    <P>In the past it was almost always necessary to catch specimens (usually with a butterfly net) and examine them closely using a microscope. However, the advent of digital photography means that you can snap an image with your phone or camera and then enlarge it many times to look at distinguishing features. With practice, it is possible to identify almost all species in the field. Distinctive combinations of size, shape, colour and wing pattern mean that many dragonflies and damselflies can now be identified without the use of a microscope. Many species also exhibit quite distinctive behaviour.  Unfortunately, we have not had the time to document more than the most obvious behaviour of a small number of species. However, careful observation will mean that you can start to recognise species-specific behaviour.  Often a species can be more quickly recognised by its characteristic behaviour than other attributes.</P>

    <P>This guide applies to both the dragonflies ‘proper’, the Anisoptera, and to the damselflies, the Zygoptera. The dragonflies proper are usually larger and stouter than the more slender damselflies.  The greatest difference, however, is that the wings of dragonflies are commonly held horizontally when at rest, while the wings of damselflies are held closed, vertically, above the body. </P>

    <H1>Getting Started</H1>
    <P>The basis of this app is the photographs that illustrate the distinctive colours, shapes and wing patterns of adult dragonflies and damselflies.   These features, together with knowledge of their size, particularly wingspan, mean that many species can be quickly, and confidently, identified. Each image is accompanied by a description of the features that distinguish the species, most readily, from all others. Where major differences exist, usually colour, males and females are illustrated separately. </P>

    <H1>Variability Rules!</H1>
    <P>As for many other members of the animal kingdom, considerable variation can exist within a species, both between males and females, and with age. The variability of greatest concern here is that of colour.  For example, within a single species the male dragonfly may be red while the female can be orange or yellow. Additionally, as the adults of some species mature, particularly males, they become covered with a powdery blue coating, known as pruinescence. This coating may completely obscure their initial colour.  Female damselflies may be a much duller version (colour-wise) than their male counterpart.  These features need to be kept in mind when identifying specimens for the first time. </P>

    <H1>Where to See Dragonflies and Damselflies</H1>
    <P>Dragonflies and dragonflies spend most of their life cycle underwater, in freshwater wetlands, rivers and streams, as larvae. However, this guide is for the flying terrestrial adults, because this is the life phase that is easiest to see (and most spectacular). All adults fly and some may move far from water. Different species will be more abundant in some habitats than others. We have not yet undertaken enough surveys in northern Australia to confidently list all species and habitat associations here. Hopefully this app will make it much easier to collect this data in the future. </P>

    <P>The dragonflies that are the easiest to see, photograph and identify are ‘perchers’ (most libellulids and the gomphids).  As the name suggests, they can often be seen perched on vegetation, often the stems of spear grass or Pandanus, from which they fly to capture prey.  Not surprisingly, most of the species photographed for this app are perchers. Individuals may return to the same perch many times over (males are often territorial) and so careful observation can reveal excellent identification and photographic opportunities. </P>

    <P>Some species, particularly the Aeshnidae and Corduliidae, are ‘fliers’.  They are often large dragonflies, and their continual, active flight, means that they are much harder to observe closely, and identify, in the field. </P>

    <P>Some species disperse widely from their emergence sites, particularly those that live in temporary waters, such as floodplain wetlands. Others, particularly river and stream-dwelling species, remain closer to their emergence sites throughout their adult phase.</P>

    <H1>When to see dragonflies and damselflies</H1>
    <P>Most ‘Top Enders’ will tell you that the presence of large flocks of dragonflies heralds the end of the wet season.  Certainly, the best time to see the largest number of species is at the end of the Wet and the beginning of the Dry, from February to July. However, no matter what time of year you visit the region, some dragonflies are likely to be flying.</P>

    <H1>Biology and Ecology in Brief</H1>
    <P>There are three life stages: the egg; larva;  and adult. The egg and larval phases are aquatic and the larval stage is the most long-lived phase. Larvae may live, depending on the species, from months to years, in both flowing waters (rivers and streams) and standing waters (wetlands, billabongs and swamps). Larvae undergo gradual development (known as hemimetabolism) where they increase in body size and form wings, before finally shedding the last larval skin to emerge as an adult. To do this, the larva leaves the water and attachs itself to a plant stem, rock or tree trunk. Dry cast- off skins can often be seen just above the waterline. Adults can live from several weeks to several months.</P>

    <P>Both larvae and adults are predators. Larvae feed on other aquatic invertebrates, small fish and tadpoles. Larvae have specialised mouthparts that are very effective in rapidly and accurately catching and holding prey. Adults feed on small insects (often flies).  </P>

    <P>Newly emerged adults enter a pre-reproductive period during which they feed and disperse.  This is followed by a reproductive period in which both males and females return to aquatic areas. Mating involves a complex set of behaviours, much of it undertaken while in flight. Ultimately sperm is transferred from the male to the female, and the female returns to water to lay the eggs. Females of some species (mainly Libellulidae) can be seen dipping the tip of the abdomen in water to deposit eggs while others (particularly damselflies) lay eggs within submerged aquatic plants. </P>

    <H1>Distribution and Conservation</H1>
    <P>The dragonfly fauna of Australia is quite diverse, 302 species have been recorded (Watson et al. 1991) of which 57 species of dragonflies proper (Anisoptera) and 36 species of damselflies (Zygoptera), have been recorded from Kakadu National Park.  The fact that almost one-third of the species of Australian dragonflies occur in the Park indicates that it is an important area for the conservation of the group. While some species are widely dispersed, both in tropical Australia, and further afield in southeast Asia, others, particularly those associated with streams, gorges and rockholes, tend to be more restricted.  It is for these species, in particular, that Kakadu National Park plays an extremely important role in the conservation of Australia’s dragonfly and damselfly fauna.</P>

    <H1>Size</H1>
    <P>We have used the size classes defined by Watson et al. (1991) as follows:</P>
    <H2>Dragonflies (Anisoptera)</H2>
    <TableRow>tiny:     wing span &lt; about 40 mm</TableRow>
    <TableRow>small:    wingspan about 40-60 mm</TableRow>
    <TableRow>medium:   wingspan about 60 – 85 mm</TableRow>
    <TableRow>large:    wingspan about 85 – 115 mm</TableRow>
    <TableRow>very large:    wingspan &gt; 115 mm</TableRow>

    <H2>Damselflies (Zygoptera)</H2>
    <TableRow>tiny:     wing span &lt; about 25 mm</TableRow>
    <TableRow>small:    wingspan about 25-35 mm</TableRow>
    <TableRow>medium:   wingspan about 35-40 mm</TableRow>
    <TableRow>large:    wingspan about 50-75 mm</TableRow>
    <TableRow>very large:    wingspan &gt; 70 mm</TableRow>

    <P>The dragonflies (Anisoptera) included in this app are grouped according to size as follows:</P>
    <H2>tiny</H2>
    <I>Nannodiplax rubra</I>
    <H2>small</H2>
    <I>Brachydiplax denticauda</I>
    <I>Diplacodes bipunctata </I>
    <I>Diplacodes haematodes </I>
    <I>Diplacodes nebulosa </I>
    <I>Diplacodes trivialis </I>
    <I>Lathrecista asiatica festa </I>
    <I>Nannophlebia mudginberri </I>
    <H2>medium</H2>
    <I>Agrionoptera insignis allogenes </I>
    <I>Macrodiplax cora  </I>
    <I>Neurothemis  stigmatizens </I>
    <I>Notolibellula bicolor  </I>
    <I>Orthetrum caledonicum </I>
    <I>Orthetrum migratum </I>
    <I>Orthetrum sabina </I>
    <I>Rhyothemis braganza </I>
    <I>Rhyothemis graphiptera </I>
    <I>Rhyothemis phyllis</I>
    <I>Tholymis tillargia </I>
    <I>Urothemis aliena </I>
    <I>Zyxomma elgneri </I>
    <I>Zyxomma petiolatum </I>
    <H2>large</H2>
    <I>Anax papuensis was Hemianax papuensis </I>
    <I>Hydrobasileus brevistylus </I>
    <I>Ictinogomphus australis </I>
    <I>Gynacantha nourlangie </I>
    <I>Gynacantha dobsoni </I>
    <I>Tramea loewii </I>
    <H2>very large</H2>
    <I>Anax guttatus </I>
    <I>Anax gibbosulus</I>
    <BR />

    <P>The damselflies (Zygoptera) are listed here on the basis of family and genera, rather than size, as relative to most dragonflies, almost all are small.</P>
    <Text>The damselflies in this app include:</Text>
    <I>Nososticta koongarra</I>
    <I>Agriocnemis pygmaea</I>
    <I>Austrocnemis macccullochi</I>
    <I>Austroagrion exclamationis</I>
    <I>Ceriagrion aeruginosum</I>
    <I>Ischnura heterosticta</I>
    <I>Ischnura pruinescens</I>
    <I>Ischnura aurora</I>
    <I>Pseudoagrion aureofrons</I>
    <I>Pseudoagrion jedda</I>
    <I>Xanthagrion erythroneurum</I>

    <H1>References</H1>
    <P>Watson, JAL, Theischinger, G, Abbey, HM (1991) The Australian Dragonflies- A guide to the identification, distributions and habitats of Australian Odonata. 278 pp.  CSIRO Publishing. Australia</P>

    <P>Theischinger, J & Hawking, J (2012) The complete field guide to dragonflies of Australia. 366 pp. CSIRO Publishing. Australia</P>
  </View>
);

const styles = StyleSheet.create({
  title: {
    lineHeight: 22,
    fontSize: 20,
    paddingTop: 2,
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 2,
  },
  italic: {
    fontStyle: 'italic',
  },
  paragraph: {
    marginBottom: 8,
  },
  br: {
    marginBottom: 8,
  },
});