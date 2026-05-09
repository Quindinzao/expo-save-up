import { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleProp,
    ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Typography from "../Typography";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./styles";

export interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    label: string;
    options: DropdownOption[];
    value?: string;
    placeholder?: string;
    onChange?: (option: DropdownOption) => void;
    style?: StyleProp<ViewStyle>;
}

export default function Dropdown({
    label,
    options,
    value,
    placeholder = "Selecione...",
    onChange,
    style,
}: DropdownProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const triggerRef = useRef<View>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleOpen = useCallback(() => {
        triggerRef.current?.measureInWindow((x, y, width, height) => {
            setDropdownLayout({ x, y, width, height });
            setIsOpen(true);
        });
    }, []);

    const handleSelect = useCallback(
        (option: DropdownOption) => {
            onChange?.(option);
            setIsOpen(false);
        },
        [onChange]
    );

    return (
        <View style={[styles.container, style]}>
            <Typography variant="h5">{label}</Typography>

            <TouchableOpacity
                ref={triggerRef}
                activeOpacity={0.7}
                style={styles.trigger}
                onPress={handleOpen}
            >
                <Text style={selectedOption ? styles.triggerText : styles.placeholderText}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Feather
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={theme.colors.placeholder}
                />
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View
                        style={[
                            styles.dropdown,
                            {
                                top: dropdownLayout.y + dropdownLayout.height + 4,
                                left: dropdownLayout.x,
                                width: dropdownLayout.width,
                            },
                        ]}
                    >
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            scrollEnabled={options.length > 6}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        styles.option,
                                        item.value === value && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
