import { Input } from '@rneui/themed';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, Sizes, Fonts } from '../../../assets/styles';

const SearchInfo = ({ searchText, categoryData, search_product, updateState }) => {
    return (
        <View
            style={{
                paddingVertical: Sizes.fixPadding,
                borderBottomWidth: 1,
                borderColor: Colors.gray + '30',
                ...styles.row,
            }}>
            <Input
                value={searchText}
                placeholder={`Search for ${categoryData}`}
                placeholderTextColor={Colors.gray}
                onChangeText={text => search_product(text)}
                inputStyle={{ ...Fonts.black14InterMedium }}
                containerStyle={{
                    height: 36,
                    flex: 1,
                    flexGrow: 1.3,
                }}
                inputContainerStyle={{
                    borderBottomWidth: 0,
                    margin: 0,
                    padding: 0,
                    paddingVertical: 0,
                    paddingTop: 0,
                    backgroundColor: Colors.grayLight + '90',
                    borderRadius: 1000,
                    paddingHorizontal: Sizes.fixPadding,
                    height: 36,
                }}
                rightIcon={
                    <Image
                        source={require('../../../assets/icons/search.png')}
                        style={{ width: 20, height: 20 }}
                    />
                }
            />
            <TouchableOpacity
                onPress={() => updateState({ filterVisible: true })}
                style={{ flex: 0.2, marginLeft: Sizes.fixPadding }}>
                <Image
                    source={require('../../../assets/icons/filter.png')}
                    style={{ width: 20, height: 20 }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default SearchInfo

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});