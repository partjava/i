#!/bin/bash

INSTALLER_VERSION="1.7.0"

# 如果脚本被 source 加载（用于测试），则跳过主逻辑执行
# 检查方式：如果设置了 UNITTEST_MODE 环境变量，或者脚本不是直接执行的
_IS_SOURCED=false
if [ "${UNITTEST_MODE:-false}" = "true" ] || [ "${BASH_SOURCE[0]}" != "${0}" ]; then
    _IS_SOURCED=true
fi

#install user
RUNUSER=root
RUNUID=$(id -u $RUNUSER)

if [ $UID -ne $RUNUID ]; then
    SCRIPT_PATH="$(dirname "$0")/$(basename "$0")"
    # Run as root if not run as root
    if command -v runuser &>/dev/null && runuser -l root -c pwd &>/dev/null; then
        # runuser command exists
        runuser -l $RUNUSER -c "$SCRIPT_PATH $@"
        exit $?
    elif command -v sudo &>/dev/null && sudo pwd &>/dev/null; then
        # sudo command exists
        sudo "$SCRIPT_PATH" "$@"
        exit $?
    elif command -v su &>/dev/null && su root -c pwd &>/dev/null; then
        su $RUNUSER -c "$SCRIPT_PATH $@"
        exit $?
    else
        echo "You must have root privilege to run this script." 1>&2
        exit 1
    fi
fi

##Region
CORP_POSTFIX="-corp"
INTERNET_POSTFIX="-internet"
INNER_POSTFIX="-inner"
FINANCE_POSTFIX="-finance"
ACCELERATION_POSTFIX="-acceleration"
INTERNAL_POSTFIX="-internal"

# Region 基础定义
CN_BEIJING="cn-beijing"
CN_QINGDAO="cn-qingdao"
CN_SHANGHAI="cn-shanghai"
CN_HANGZHOU="cn-hangzhou"
CN_SHENZHEN="cn-shenzhen"
AP_NORTHEAST_1="ap-northeast-1"
EU_CENTRAL_1="eu-central-1"
ME_EAST_1="me-east-1"
US_WEST_1="us-west-1"

# Region 变体定义
CN_BEIJING_INTERNET=$CN_BEIJING$INTERNET_POSTFIX
CN_BEIJING_INNER=$CN_BEIJING$INNER_POSTFIX
CN_BEIJING_ACCELERATION=$CN_BEIJING$ACCELERATION_POSTFIX

CN_QINGDAO_INTERNET=$CN_QINGDAO$INTERNET_POSTFIX
CN_QINGDAO_INNER=$CN_QINGDAO$INNER_POSTFIX
CN_QINGDAO_ACCELERATION=$CN_QINGDAO$ACCELERATION_POSTFIX

CN_SHANGHAI_INTERNET=$CN_SHANGHAI$INTERNET_POSTFIX
CN_SHANGHAI_INNER=$CN_SHANGHAI$INNER_POSTFIX
CN_SHANGHAI_FINANCE=$CN_SHANGHAI$FINANCE_POSTFIX
CN_SHANGHAI_ACCELERATION=$CN_SHANGHAI$ACCELERATION_POSTFIX

CN_HANGZHOU_INTERNET=$CN_HANGZHOU$INTERNET_POSTFIX
CN_HANGZHOU_FINANCE=$CN_HANGZHOU$FINANCE_POSTFIX
CN_HANGZHOU_INNER=$CN_HANGZHOU$INNER_POSTFIX
CN_HANGZHOU_ACCELERATION=$CN_HANGZHOU$ACCELERATION_POSTFIX

CN_SHENZHEN_INTERNET=$CN_SHENZHEN$INTERNET_POSTFIX
CN_SHENZHEN_FINANCE=$CN_SHENZHEN$FINANCE_POSTFIX
CN_SHENZHEN_INNER=$CN_SHENZHEN$INNER_POSTFIX
CN_SHENZHEN_ACCELERATION=$CN_SHENZHEN$ACCELERATION_POSTFIX

AP_NORTHEAST_1_INTERNET=$AP_NORTHEAST_1$INTERNET_POSTFIX
AP_NORTHEAST_1_INNER=$AP_NORTHEAST_1$INNER_POSTFIX
AP_NORTHEAST_1_ACCELERATION=$AP_NORTHEAST_1$ACCELERATION_POSTFIX

EU_CENTRAL_1_INTERNET=$EU_CENTRAL_1$INTERNET_POSTFIX
EU_CENTRAL_1_INNER=$EU_CENTRAL_1$INNER_POSTFIX
EU_CENTRAL_1_ACCELERATION=$EU_CENTRAL_1$ACCELERATION_POSTFIX

ME_EAST_1_INTERNET=$ME_EAST_1$INTERNET_POSTFIX
ME_EAST_1_INNER=$ME_EAST_1$INNER_POSTFIX
ME_EAST_1_ACCELERATION=$ME_EAST_1$ACCELERATION_POSTFIX

US_WEST_1_INTERNET=$US_WEST_1$INTERNET_POSTFIX
US_WEST_1_INNER=$US_WEST_1$INNER_POSTFIX
US_WEST_1_ACCELERATION=$US_WEST_1$ACCELERATION_POSTFIX

# Finance region 的 internet 变体
CN_HANGZHOU_FINANCE_INTERNET=$CN_HANGZHOU_FINANCE$INTERNET_POSTFIX
CN_SHANGHAI_FINANCE_INTERNET=$CN_SHANGHAI_FINANCE$INTERNET_POSTFIX
CN_SHENZHEN_FINANCE_INTERNET=$CN_SHENZHEN_FINANCE$INTERNET_POSTFIX

# SLS 特殊 region 配置数组：格式为 "region:sls_internal_endpoint:sls_internet_endpoint:sls_intranet_endpoint"
# 新增 SLS 特殊 region 只需在此数组中添加一行即可
# 注意：判断时会自动去掉 -internet 或 -internal 后缀来匹配region
SLS_SPECIAL_REGIONS=(
    "cn-hangzhou-idpt-2:log-internal.cn-hangzhou-idpt-2.idptcloud01cs.com:log.cn-hangzhou-idpt-2.idptcloud01cs.com:log-intranet.cn-hangzhou-idpt-2.idptcloud01cs.com"
    "{{IDPT_REGION}}:{{IDPT_SLS_INTERNAL_ENDPOINT}}:{{IDPT_SLS_INTERNET_ENDPOINT}}:{{IDPT_SLS_INTRANET_ENDPOINT}}"
)

###################################################################################################################################
# NOTICE: similar logic also exist in the loongcollector.sh for installation, please also update the file when modify the following logics.
###################################################################################################################################
# OSS 特殊 region 配置数组：格式为 "region:oss_internal_endpoint:oss_internet_endpoint:"
# 新增 OSS 特殊 region 只需在此数组中添加一行即可
# 注意：判断时会自动去掉 -internet 或 -internal 后缀来匹配region
# 注意：第三个字段为空（OSS 没有 intranet 端点），但保留冒号以保持格式一致
OSS_SPECIAL_REGIONS=(
    # IDPT regions
    "cn-hangzhou-idpt-2:oss-internal.cn-hangzhou-idpt-2.idptcloud01cs.com:oss.cn-hangzhou-idpt-2.idptcloud01cs.com:"
    "{{IDPT_REGION}}:{{IDPT_OSS_INTERNAL_ENDPOINT}}:{{IDPT_OSS_INTERNET_ENDPOINT}}:"
    # Finance regions
    "$CN_HANGZHOU_FINANCE:oss-cn-hzfinance-internal.aliyuncs.com:oss-cn-hzfinance.aliyuncs.com:"
    "$CN_SHENZHEN_FINANCE:oss-cn-shenzhen-finance-1-internal.aliyuncs.com:oss-cn-shenzhen-finance-1.aliyuncs.com:"
    "$CN_SHANGHAI_FINANCE:oss-cn-shanghai-finance-1-internal.aliyuncs.com:oss-cn-shanghai-finance-1.aliyuncs.com:"
)

###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
# 规范化 region 名称，去掉网络类型后缀，返回基础的 region_id
# $1: region 名称（可能包含 -internet/-internal/-acceleration 等后缀）
# 输出：规范化后的 region_id（去掉所有网络类型后缀）
normalize_region_id() {
    local region="$1"
    # 去掉网络类型后缀
    region=$(echo "$region" | sed "s/${INTERNET_POSTFIX}$//")
    region=$(echo "$region" | sed "s/${ACCELERATION_POSTFIX}$//")
    region=$(echo "$region" | sed "s/${INTERNAL_POSTFIX}$//")
    region=$(echo "$region" | sed "s/${INNER_POSTFIX}$//")
    echo -n "$region"
}

###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
# 判断 region 是否包含指定单词（通过单词边界匹配）
# $1: region 名称
# $2: 单词模式（如 $INTERNET_POSTFIX）
# 返回：0 如果包含该单词，1 否则
# 注意：使用单词边界 \b 进行匹配，检查字符串中是否包含该单词，而非仅检查后缀
contains_word() {
    local region="$1"
    local word="$2"
    if echo "$region" | grep -- "\b${word}\b" >/dev/null 2>&1; then
        return 0
    fi
    return 1
}

###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
# 从端点字符串中提取指定类型的端点
# $1: 端点字符串，格式为 "internal:internet:intranet"（用冒号分割）
# $2: 端点类型，可选值：internal、internet、intranet
# 输出：对应的端点值
get_endpoint_by_type() {
    local endpoints="$1"
    local endpoint_type="$2"
    case "$endpoint_type" in
        "internal")
            echo -n "${endpoints%%:*}"  # 第一个字段
            ;;
        "internet")
            local temp="${endpoints#*:}"  # 移除第一个字段
            echo -n "${temp%%:*}"  # 第二个字段
            ;;
        "intranet")
            local temp="${endpoints#*:}"  # 移除第一个字段
            temp="${temp#*:}"  # 移除第二个字段
            echo -n "${temp%%:*}"  # 第三个字段
            ;;
    esac
}

# 获取 SLS 特殊 region 的配置行
# $1: region（会自动去掉网络类型后缀）
# 输出：配置行（如果找到），返回码 0 表示找到，1 表示未找到
get_sls_special_config() {
    local check_region="$1"
    local normalized_region=$(normalize_region_id "$check_region")
    local special_region
    for special_config in "${SLS_SPECIAL_REGIONS[@]}"; do
        special_region="${special_config%%:*}"
        if [ "$normalized_region" = "$special_region" ]; then
            echo -n "$special_config"
            return 0
        fi
    done
    return 1
}

###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
# 获取 OSS 特殊 region 的配置行
# $1: region（会自动去掉网络类型后缀）
# 输出：配置行（如果找到），返回码 0 表示找到，1 表示未找到
get_oss_special_config() {
    local check_region="$1"
    local normalized_region=$(normalize_region_id "$check_region")
    local special_region
    for special_config in "${OSS_SPECIAL_REGIONS[@]}"; do
        special_region="${special_config%%:*}"
        if [ "$normalized_region" = "$special_region" ]; then
            echo -n "$special_config"
            return 0
        fi
    done
    return 1
}



###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
# 获取 OSS 特殊 region 的 OSS endpoint（会根据网络类型返回对应端点）
# $1: region（可能包含 -internet/-internal/-acceleration 等后缀）
# $2: endpoint_type（必填，可选值：internet、internal）
# 输出：对应的 OSS endpoint，如果 region 无效或 endpoint_type 缺失则返回空字符串
get_oss_special_endpoint() {
    local check_region="$1"
    local endpoint_type="$2"
    local oss_config=$(get_oss_special_config "$check_region")
    # 配置格式为 "region:internal:internet:"，去掉第一个字段后直接使用
    local endpoints="${oss_config#*:}"
    get_endpoint_by_type "$endpoints" "$endpoint_type"
}

# 获取 SLS 特殊 region 的 SLS endpoint（会根据网络类型返回对应端点）
# $1: region（可能包含 -internet/-internal 等后缀）
# $2: endpoint_type（必填，可选值：internet、internal、intranet）
# 输出：对应的 SLS endpoint，如果 region 无效或 endpoint_type 缺失则返回空字符串
get_sls_special_endpoint() {
    local check_region="$1"
    local endpoint_type="$2"
    local sls_config=$(get_sls_special_config "$check_region")
    # 配置格式为 "region:internal:internet:intranet"，去掉第一个字段后直接使用
    local endpoints="${sls_config#*:}"
    get_endpoint_by_type "$endpoints" "$endpoint_type"
}


###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
# 获取 region 的 OSS endpoint（优先检查 OSS 特殊 region，否则使用默认格式）
# $1: region（必填，可能包含 -internet/-internal/-acceleration/-inner 等后缀）
# 输出：OSS endpoint（如 "oss-cn-hangzhou.aliyuncs.com"）
# 注意：
#   - internet 后缀：返回 internet 端点
#   - acceleration 后缀：返回 internet 端点
#   - inner 后缀：返回特定端点
#   - internal 后缀：返回 internal 端点
#   - 无后缀：返回 internal 端点
get_oss_endpoint() {
    local region="$1"
    local region_id
    
    if contains_word "$region" "$INTERNET_POSTFIX" || contains_word "$region" "$ACCELERATION_POSTFIX"; then
        # internet 或 acceleration：使用 internet 端点
        if get_oss_special_config "$region" >/dev/null 2>&1; then
            get_oss_special_endpoint "$region" "internet"
        else
            region_id=$(normalize_region_id "$region")
            echo -n "oss-$region_id.aliyuncs.com"
        fi
    elif contains_word "$region" "$INNER_POSTFIX" || contains_word "$region" "$CORP_POSTFIX"; then
        # inner 或 corp：特殊处理（需要测试两个端点）
        local endpoint="cn-zhangjiakou.oss.aliyuncs.com"
        curl "$endpoint" -sSfL --retry 3 --connect-timeout 1 2>&1 | grep "403 Forbidden" >/dev/null 2>&1
        if [ $? -ne 0 ]; then
            endpoint="oss-cn-zhangjiakou.aliyuncs.com"
        fi
        echo -n "$endpoint"
    else
        # internal 后缀或默认情况：返回 internal 端点
        if get_oss_special_config "$region" >/dev/null 2>&1; then
            get_oss_special_endpoint "$region" "internal"
        else
            region_id=$(normalize_region_id "$region")
            echo -n "oss-$region_id-internal.aliyuncs.com"
        fi
    fi
}

# 获取 region 的 SLS data endpoint（优先检查 SLS 特殊 region，否则使用默认格式）
# $1: region（必填，可能包含 -internet/-internal/-acceleration/-inner 等后缀）
# 输出：data endpoint（如 "cn-hangzhou.log.aliyuncs.com"）
# 注意：
#   - internet 后缀：返回 internet 端点
#   - acceleration 后缀：返回 internet 端点
#   - inner 后缀：返回 share 端点
#   - internal 后缀：返回 internal 端点
#   - 无后缀：通过 ping 测试选择最佳端点（internal 优先，fallback 到 intranet）
get_sls_data_endpoint() {
    local region="$1"
    local region_id
    
    if contains_word "$region" "$INTERNET_POSTFIX"; then
        region_id=$(normalize_region_id "$region")
        if get_sls_special_config "$region" >/dev/null 2>&1; then
            get_sls_special_endpoint "$region" "internet"
        else
            echo -n "${region_id}.log.aliyuncs.com"
        fi
    elif contains_word "$region" "$ACCELERATION_POSTFIX"; then
        # acceleration 使用 internet 端点
        region_id=$(normalize_region_id "$region")
        get_sls_data_endpoint "${region_id}${INTERNET_POSTFIX}"
    elif contains_word "$region" "$INNER_POSTFIX"; then
        region_id=$(normalize_region_id "$region")
        echo -n "${region_id}-share.log.aliyuncs.com"
    elif contains_word "$region" "$INTERNAL_POSTFIX"; then
        region_id=$(normalize_region_id "$region")
        if get_sls_special_config "$region" >/dev/null 2>&1; then
            get_sls_special_endpoint "$region" "internal"
        else
            echo -n "${region_id}-internal.log.aliyuncs.com"
        fi
    else
        # 默认情况：通过 ping 测试选择最佳端点
        region_id="$region"
        local intranet_endpoint
        local internal_endpoint
        
        if get_sls_special_config "$region_id" >/dev/null 2>&1; then
            intranet_endpoint=$(get_sls_special_endpoint "$region_id" "intranet")
            internal_endpoint=$(get_sls_special_endpoint "$region_id" "internal")
        else
            intranet_endpoint="${region_id}-intranet.log.aliyuncs.com"
            internal_endpoint="${region_id}-internal.log.aliyuncs.com"
        fi
        
        # ping 测试选择最佳端点
        if ping -c 1 -W 1 $internal_endpoint &>/dev/null; then
            echo -n "$internal_endpoint"
        else
            echo -n "$intranet_endpoint"
        fi
    fi
}

##loongcollector package
PACKAGE_NAME="loongcollector-linux64.tar.gz"

CONTROLLER_DIR="/etc/init.d"
SYSTEMD_SERVICE_DIR="/etc/systemd/system"

##ilogtaild script
LOGTAIL_CONTROLLER_FILE="ilogtaild"
LOGTAIL_SYSTEMD_SERVICE_NAME="${LOGTAIL_CONTROLLER_FILE}.service"

##loongcollectord script
CONTROLLER_FILE="loongcollectord"
SYSTEMD_SERVICE_NAME="${CONTROLLER_FILE}.service"

service_file_path=""
logtail_service_file_path=""

##loongcollector binary
BIN_DIR="/usr/local/ilogtail"

LOGTAIL_SYS_CONF_DIR="/etc/ilogtail"

##config file
README_FILE="README"
CA_CERT_FILE="ca-bundle.crt"
CONFIG_FILE="ilogtail_config.json"

##os version
CENTOS_OS="CentOS"
UBUNTU_OS="Ubuntu"
DEBIAN_OS="Debian"
ALIYUN_OS="Aliyun"
OPENSUSE_OS="openSUSE"
OTHER_OS="other"

# install eBPF dependencies, will set to false on unsupported regions such as finance cloud and corp,
# true on other regions including private cloud
EBPF="auto"
# main or compat
FUNCTION="main"
USE_LOCAL_PACKAGE="false"
FORCE_UPGRADE="false"
# enable basic host monitor
ENABLE_HOST_MONITOR="false"

# eBPF preparation status tracking
EBPF_PREPARE_FAILED=false

CURRENT_DIR=$(dirname "$0")
CURRENT_DIR=$(
    cd "$CURRENT_DIR" || exit
    pwd
)
cd "$CURRENT_DIR" || exit

logError() {
    echo -n '[Error]:   ' "$@"
    echo -en '\033[120G \033[31m' && echo [ Error ]
    echo -en '\033[0m'
}

logWarning() {
    echo -n '[Warning]: ' "$@"
    echo -en '\033[120G \033[33m' && echo [ Warning ]
    echo -en '\033[0m'
}

REGION=""
ALIUID=""
INSTANCE_IDENTITY=""
HAS_META_SERVER=-1

KERNEL_VERSION=$(uname -r)
OS_VERSION=$OTHER_OS
OS_ISSUE=$(cat /etc/issue | tr A-Z a-z)
ARCH=$(uname -m)

# prepare download funcion
# some distribution such as Fedora CoreOS does not have wget
# some distribution such as Alpine/Busybox does not have curl
CONNECTION_TIMEOUT=5
WGET_INSTALLED=true && wget --version &>/dev/null || WGET_INSTALLED=false
CURL_INSTALLED=true && curl --version &>/dev/null || CURL_INSTALLED=false
download() {
    local download_url=$1
    local destination=$2
    [ "$WGET_INSTALLED" = "true" ] && {
        wget ${download_url} -nv --tries 3 --connect-timeout ${CONNECTION_TIMEOUT} --read-timeout 15 -O ${destination} || {
            echo >&2 "Failed to download from ${download_url} to ${destination}, Please check your network service."
            return 1
        }
    } || {
        curl ${download_url} -sSfL --retry 3 --connect-timeout ${CONNECTION_TIMEOUT} --speed-time 15 --speed-limit 1000 -o ${destination} || {
            echo >&2 "Failed to download from ${download_url} to ${destination}, Please check your network service."
            return 1
        }
    }
    return 0
}

urlopen() {
    local download_url=$1
    [ "$CURL_INSTALLED" = "true" ] && {
        curl ${download_url} -sSfL --retry 3 --connect-timeout ${CONNECTION_TIMEOUT} || {
            echo "Failed to open ${download_url}, Please check your network service." 1>&2
            return 1
        }
    } || {
        wget ${download_url} -nv --tries 3 --connect-timeout ${CONNECTION_TIMEOUT} -O- || {
            echo "Failed to open ${download_url}, Please check your network service." 1>&2
            return 1
        }
    }
    return 0
}

build_package_address() {
    local package_address="$1"
    local package_name="$2"

    if [ -n "$VERSION" ]; then
        package_address="$package_address/$VERSION/$ARCH/$FUNCTION_TYPE"
    else
        package_address="$package_address/latest/$ARCH/$FUNCTION_TYPE"
    fi
    echo "${package_address}/${package_name}"
}

refresh_meta() {
    local last_timeout=${CONNECTION_TIMEOUT}
    CONNECTION_TIMEOUT=$1
    urlopen "http://100.100.100.200/latest/meta-data/region-id" &>/dev/null
    HAS_META_SERVER=$?
    if [ $HAS_META_SERVER -eq 0 ]; then
        INSTANCE_IDENTITY=$(urlopen "http://100.100.100.200/latest/dynamic/instance-identity/document")
    fi
    if [ $HAS_META_SERVER -eq 0 ] && [ -z "$ALIUID" ]; then
        ALIUID=$(urlopen "http://100.100.100.200/latest/meta-data/owner-account-id")
        re='^[0-9]+$'
        if [[ $ALIUID =~ $re ]]; then
            echo "Fetch aliuid from meta server: $ALIUID"
        else
            ALIUID=""
        fi
    fi
    CONNECTION_TIMEOUT=${last_timeout}
}

# Test (with shorter timeout) if meta server is existing? If yes, fetch aliuid.
# Skip in unittest mode to avoid network access
if [ "$_IS_SOURCED" != "true" ]; then
    refresh_meta 1
fi

normalize_region() {
    # Convert all _ in $REGION to -.
    REGION=$(echo $REGION | sed 's/_/-/g')
    # Remove -vpc
    REGION=$(echo $REGION | sed 's/-vpc//g')

    if [ $REGION = "auto" ]; then
        if [ $HAS_META_SERVER -ne 0 ]; then
            # Double check, curl with longer timeout.
            refresh_meta 5
            if [ $HAS_META_SERVER -ne 0 ]; then
                echo "[FAIL] Sorry, fail to get region automatically, please specify region and try again."
                echo "[NOTE] 'auto' can only work on ECS VM."
                exit 1
            fi
        fi
        REGION=$(urlopen "http://100.100.100.200/latest/meta-data/region-id")
    fi
}

get_loongcollector_bucket() {
    local region_id="$REGION"
    if contains_word "$REGION" "$INTERNET_POSTFIX" || contains_word "$REGION" "$ACCELERATION_POSTFIX"; then
        region_id=$(normalize_region_id "$REGION")
    elif contains_word "$REGION" "$INNER_POSTFIX" || contains_word "$REGION" "$CORP_POSTFIX"; then
        region_id="cn-zhangjiakou"
    elif contains_word "$REGION" "$INTERNAL_POSTFIX"; then
        region_id=$(normalize_region_id "$REGION")
    fi
    # IDPT region 在 SLS 和 OSS 特殊 region 中都存在
    if get_sls_special_config "$region_id" >/dev/null 2>&1 && get_oss_special_config "$region_id" >/dev/null 2>&1; then
        echo -n "observability-release-$region_id"
    else
        echo -n "aliyun-observability-release-$region_id"
    fi
}

###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
get_sysom_bucket() {
    local region_id="$REGION"
    # Finance regions are not supported (checking base finance regions is sufficient since *_FINANCE_INTERNET contains *_FINANCE)
    if contains_word "$REGION" "$FINANCE_POSTFIX"; then
        region_id=""
    elif contains_word "$REGION" "$INTERNET_POSTFIX" || contains_word "$REGION" "$ACCELERATION_POSTFIX"; then
        region_id=$(normalize_region_id "$REGION")
    elif contains_word "$REGION" "$INNER_POSTFIX" || contains_word "$REGION" "$CORP_POSTFIX"; then
        region_id=""
    elif contains_word "$REGION" "$INTERNAL_POSTFIX"; then
        region_id=$(normalize_region_id "$REGION")
    fi
    if [ -z "$region_id" ]; then
        return 1 # these regions are not supported
    fi
    echo -n "sysom-$region_id"
}


PACKAGE_REGION_ADDRESS=""
# Before calling this, set $REGION or pass "auto" as first parameter to update REGION from meta server.
# After calling successfully, PACKAGE_REGION_ADDRESS will be set.
update_package_address() {
    if [ -n "$PACKAGE_REGION_ADDRESS" ]; then
        return
    fi

    local bucket=$(get_loongcollector_bucket)
    local endpoint=$(get_oss_endpoint "$REGION")
    PACKAGE_REGION_ADDRESS="http://$bucket.$endpoint/loongcollector/linux64"
    echo "Package address: $PACKAGE_REGION_ADDRESS"
}

download_file() {
    update_package_address $1
    local package_address
    package_address=$(build_package_address "$PACKAGE_REGION_ADDRESS" "$PACKAGE_NAME")

    download $package_address $PACKAGE_NAME
    if [ $? != 0 ]; then
        logError "Download loongcollector install file from $package_address failed."
        logError "Can not find available package address for region {$REGION}."
        logError "Please confirm the region you specified and try again."
        rm -f $PACKAGE_NAME
        exit 1
    fi
}

###################################################################################################################################
# NOTICE: similar logic also exist in the run_loongcollector.sh for container, please also update the file when modify the following logics.
###################################################################################################################################
check_or_prepare_vmlinux() {
    local region=$1

    local sysak_btf_download_dir="$BIN_DIR/tools"
    local sysak_btf_download_file="$sysak_btf_download_dir/vmlinux-$KERNEL_VERSION"
    # https://gitee.com/anolis/coolbpf/blob/master/third/libbpf/src/btf.c#L4943
    # the same as search paths in btf__load_vmlinux_btf
    local files=(
        "/sys/kernel/btf/vmlinux"
        "$sysak_btf_download_file"
        "/boot/vmlinux-$KERNEL_VERSION"
        "/lib/modules/$KERNEL_VERSION/vmlinux-$KERNEL_VERSION"
        "/lib/modules/$KERNEL_VERSION/build/vmlinux"
        "/usr/lib/modules/$KERNEL_VERSION/kernel/vmlinux"
        "/usr/lib/debug/boot/vmlinux-$KERNEL_VERSION"
        "/usr/lib/debug/boot/vmlinux-$KERNEL_VERSION.debug"
        "/usr/lib/debug/lib/modules/$KERNEL_VERSION/vmlinux"
    )

    for file in "${files[@]}"; do
        if [[ -f "$file" ]]; then
            echo "Found valid btf file: $file"
            return 0
        fi
    done
    mkdir -p "$sysak_btf_download_dir"

    echo "No local valid btf file, download from remote ..."
    local bucket=$(get_sysom_bucket)
    if [ -z "$bucket" ]; then
        echo "remote btf file NOT available in region {$REGION}"
        return 1
    fi
    local endpoint=$(get_oss_endpoint "$REGION")
    local download_url="http://$bucket.$endpoint/home/hive/btf/${ARCH}/vmlinux-${KERNEL_VERSION}"
    download "$download_url" "$sysak_btf_download_file"
    if [ $? -eq 0 ] && [ -f "${sysak_btf_download_file}" ]; then
        echo "BTF File downloaded successfully to ${sysak_btf_download_file}."
        return 0
    else
        if [ -f "${sysak_btf_download_file}" ]; then
            rm "${sysak_btf_download_file}"
        fi
        local fallback_url="https://mirrors.openanolis.cn/coolbpf/btf/${ARCH}/vmlinux-${KERNEL_VERSION}"
        echo "FAIL to download BTF file from $download_url, try download from $fallback_url"
        download "$fallback_url" "$sysak_btf_download_file"
        if [ $? -eq 0 ] && [ -f "${sysak_btf_download_file}" ]; then
            echo "BTF File downloaded successfully to ${sysak_btf_download_file}."
            return 0
        else
            if [ -f "${sysak_btf_download_file}" ]; then
                rm "${sysak_btf_download_file}"
            fi
            echo "FAIL to download BTF file from $fallback_url"
            return 1
        fi
    fi
    return 1
}

# Add or update enable_basic_host_monitor in config file if enabled
add_hostmonitor_config() {
    local config_file="$1"
    if [ "$ENABLE_HOST_MONITOR" = "true" ] && [ -f "$config_file" ]; then
        # Check if enable_basic_host_monitor already exists in the config file
        if grep -q '"enable_basic_host_monitor"' "$config_file"; then
            # Check if it's currently set to false
            if grep -q '"enable_basic_host_monitor".*:.*false' "$config_file"; then
                # Replace false with true
                sed -i 's/"enable_basic_host_monitor".*:.*false/"enable_basic_host_monitor": true/g' "$config_file"
                echo "Host monitor updated from false to true in config file: $config_file"
            else
                echo "Host monitor is already enabled in config file: $config_file"
            fi
        else
            # Insert enable_basic_host_monitor after the first line (which should be '{')
            # The sed command "1a" means "after line 1, append"
            sed -i '1a\    "enable_basic_host_monitor": true,' "$config_file"
            echo "Host monitor enabled in config file: $config_file"
        fi
    fi
}

generate_default_config_file() {
    local file_path="$1"
    local region_id=""
    local config_endpoint=""

    if [ "${REGION}" = "cn-hangzhou-corp" ]; then
        echo '{
    "primary_region" : "cn-hangzhou-corp",
    "config_servers" :
    [
        "http://config.sls.aliyun-inc.com"
    ],
    "data_servers" :
    [
        {
            "region": "cn-hangzhou-corp",
            "endpoint_list": [
                "sls.aliyun-inc.com"
            ]
        },
        {
            "region": "cn-shanghai-corp",
            "endpoint_list": [
                "cn-shanghai-corp.sls.aliyuncs.com"
            ]
        }
    ],
    "cpu_usage_limit" : 0.4,
    "mem_usage_limit" : 384,
    "max_bytes_per_sec" : 20971520,
    "bytes_per_sec" : 1048576,
    "buffer_file_num" : 25,
    "buffer_file_size" : 20971520,
    "buffer_map_num" : 5
}' >"$file_path"
        return
    fi
    # Extract region_id, config/data endpoint from $REGION.
    # get_sls_data_endpoint 已经处理了所有情况（包括默认情况的 ping 测试）
    region_id=$(normalize_region_id "$REGION")
    data_endpoint=$(get_sls_data_endpoint "$REGION")
    config_endpoint="http://logtail.${data_endpoint}"

    mkdir -p "$(dirname ${file_path})"
    echo "{" >${file_path}
    echo "    \"primary_region\" : \"${region_id}\"," >>${file_path}
    echo "    \"config_servers\" :" >>${file_path}
    echo "    [" >>${file_path}
    echo "        \"${config_endpoint}\"" >>${file_path}
    echo '    ],' >>${file_path}
    echo "    \"data_servers\" :" >>${file_path}
    echo "    [" >>${file_path}
    echo "        {" >>${file_path}
    echo "            \"region\" : \"${region_id}\"," >>${file_path}
    echo "            \"endpoint_list\": [" >>${file_path}
    echo "                \"${data_endpoint}\"" >>${file_path}
    echo "            ]" >>${file_path}
    echo "        }" >>${file_path}
    echo '    ],' >>${file_path}
    echo '    "cpu_usage_limit" : 0.4,' >>${file_path}
    echo '    "mem_usage_limit" : 384,' >>${file_path}
    echo '    "max_bytes_per_sec" : 20971520,' >>${file_path}
    echo '    "bytes_per_sec" : 1048576,' >>${file_path}
    echo '    "buffer_file_num" : 25,' >>${file_path}
    echo '    "buffer_file_size" : 20971520,' >>${file_path}
    echo '    "buffer_map_num" : 5' >>${file_path}
    echo '}' >>${file_path}
}

# $1: config file path, must exist.
# return: install param, such as cn-hangzhou, cn-hangzhou-acceleration, etc.
# If can not find endpoint or region_id, echo nothing and return 1.
get_install_param_from_config_file() {
    local install_param=""
    CONFIG_FILE_PATH=$1
    network_type=""
    endpoint=""
    config_server_address=""
    local region_id=""
    config_info=""
    cluster=$(cat $CONFIG_FILE_PATH | grep "cluster" | head -n 1 |
        awk -F\: '{print $2}' | sed 's/ //g' | sed 's/\"//g' | sed 's/,//g')
    if [ -n "$cluster" ]; then
        # The old version of the endpoint format.
        # Differentiate network type according to config_server_address and endpoint.
        # Step 1. endpoint == log-global.aliyuncs.com
        #   - true: Acceleration.
        #   - false: Step 2.
        # Step 2. config_server_address
        #   - *intranet/vpc.log.aliyuncs.com: VPC or traditional.
        #   - *share.log.aliyuncs.com: inner.
        #   - rest: internet.
        endpoint=$(cat $CONFIG_FILE_PATH | grep "endpoint" | head -n 1 |
            awk -F\: '{print $2}' | sed 's/ //g' | sed 's/\"//g')
        config_server_address=$(cat $CONFIG_FILE_PATH | grep "config_server_address" |
            awk -F\: '{print $2 ":" $3}' | sed 's/ //g' | sed 's/\"//g' | sed 's/,//g')
        cluster=$(cat $CONFIG_FILE_PATH | grep "cluster" | head -n 1 |
            awk -F\: '{print $2}' | sed 's/ //g' | sed 's/\"//g' | sed 's/,//g')
        region_id=$(echo $config_server_address | awk -F '/' '{ print $NF}' | awk -F '.' '{ i=NF-3; print $i}')
        config_info="config_server_address($config_server_address), endpoint($endpoint), cluster($cluster)"

        if [ -z "$endpoint" ] || [ -z "$region_id" ] || [ -z "$cluster" ]; then
            return 1
        fi
    else
        # The new version of the endpoint format.
        # Differentiate network type according to config_servers and endpoint.
        # Step 1. endpoint == log-global.aliyuncs.com
        #   - true: Acceleration.
        #   - false: Step 2.
        # Step 2. config_servers
        #   - *intranet/vpc.log.aliyuncs.com: VPC or traditional.
        #   - *share.log.aliyuncs.com: inner.
        #   - rest: internet.
        endpoint=$(cat $CONFIG_FILE_PATH | sed -n '/data_servers/,/]/p' | grep ".com" | head -n 1 | sed 's/ //g' | sed 's/\"//g' | sed 's/,//g')
        config_server_address=$(cat $CONFIG_FILE_PATH | sed -n '/config_servers/,/]/p' | grep ".com" | head -n 1 | sed 's/ //g' | sed 's/\"//g' | sed 's/,//g')
        cluster=$(cat $CONFIG_FILE_PATH | grep "region" | head -n 1 |
            awk -F\: '{print $2}' | sed 's/ //g' | sed 's/\"//g' | sed 's/,//g')
        region_id=$(echo $config_server_address | awk -F '/' '{ print $NF}' | awk -F '.' '{ i=NF-3; print $i}')
        config_info="config_server_address($config_server_address), endpoint($endpoint), region($cluster)"

        if [ -z "$endpoint" ] || [ -z "$region_id" ] || [ -z "$cluster" ]; then
            return 1
        fi
    fi
    if [ "$(echo $endpoint | grep "\blog-global.aliyuncs.com\b" | wc -l)" -ge 1 ]; then
        network_type="acceleration"
    elif [ "$(echo $cluster | grep "\bcorp\b" | wc -l)" -ge 1 ]; then
        region_id=$CN_HANGZHOU
        network_type="corp"
    else
        if [ "$(echo $region_id | grep "\b-intranet\b" | wc -l)" -ge 1 ] ||
            [ "$(echo $region_id | grep "\b-vpc\b" | wc -l)" -ge 1 ]; then
            network_type="vpc"
            region_id=$(echo $region_id | sed 's/-intranet//g')
            region_id=$(echo $region_id | sed 's/-vpc//g')
        elif [ "$(echo $region_id | grep "\b-share\b" | wc -l)" -ge 1 ]; then
            network_type="inner"
            region_id=$(echo $region_id | sed 's/-share//g')
        elif [ "$(echo $region_id | grep "\b$INTERNAL_POSTFIX\b" | wc -l)" -ge 1 ]; then
            network_type="internal"
            region_id=$(normalize_region_id "$region_id")
        else
            network_type="internet"
        fi
    fi
    install_param=$region_id
    if [ "$network_type" != "vpc" ]; then
        install_param=$region_id-$network_type
    fi

    if [ -z "$(echo $install_param | grep -E "^[0-9a-z\-]+$")" ]; then
        echo $config_info
        return 1
    fi
    echo $install_param
}

injectInstanceSuffix() {
    # inject INSTANCE_SUFFIX into loongcollectord to enable suffix filtering in checkStatus.
    local line_no
    sed -i "s/INSTANCE_SUFFIX=\"\"/INSTANCE_SUFFIX=\"$INSTANCE_SUFFIX\"/g" $CONTROLLER_DIR/$CONTROLLER_FILE
    line_no=$(grep -n "# processname: loongcollectord" $CONTROLLER_DIR/$CONTROLLER_FILE | awk -F":" '{print $1}')
    sed -i "${line_no}c # processname: loongcollectord" $CONTROLLER_DIR/$CONTROLLER_FILE

    sed -i "s/INSTANCE_SUFFIX=\"\"/INSTANCE_SUFFIX=\"$INSTANCE_SUFFIX\"/g" $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE
    line_no=$(grep -n "# processname: ilogtaild" $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE | awk -F":" '{print $1}')
    sed -i "${line_no}c # processname: $LOGTAIL_CONTROLLER_FILE" $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE
}

createSystemdFile() {
    echo "Use systemd for startup"
    echo service_file_path: $service_file_path
    rm -f $service_file_path
    echo "[Unit]" >>$service_file_path

    echo "Description=LoongCollector" >>$service_file_path
    echo "After=cloud-init.service" >>$service_file_path
    echo "" >>$service_file_path
    echo "[Service]" >>$service_file_path
    echo "Type=forking" >>$service_file_path
    echo "User=$RUNUSER" >>$service_file_path
    echo "ExecStart=$BIN_DIR/loongcollector -enable_host_id=true" >>$service_file_path
    echo "ExecStop=$CONTROLLER_DIR/$CONTROLLER_FILE stop" >>$service_file_path
    echo "" >>$service_file_path
    echo "[Install]" >>$service_file_path
    echo "WantedBy=default.target" >>$service_file_path
    systemctl enable $SYSTEMD_SERVICE_NAME && systemctl daemon-reload
    if [ $? -eq 0 ]; then
        startup_status="ok"
        sed -i "s|.*SYSTEMD_SERVICE_NAME=.*|SYSTEMD_SERVICE_NAME=\"$SYSTEMD_SERVICE_NAME\"|" $CONTROLLER_DIR/$CONTROLLER_FILE
        sed -i "s|.*SYSTEMD_SERVICE_DIR=.*|SYSTEMD_SERVICE_DIR=\"$SYSTEMD_SERVICE_DIR\"|" $CONTROLLER_DIR/$CONTROLLER_FILE
        echo "systemd startup successfully."
        # logtaild.service
        rm -f $logtail_service_file_path
        echo "[Unit]" >>$logtail_service_file_path

        echo "Description=ilogtail" >>$logtail_service_file_path
        echo "After=cloud-init.service" >>$logtail_service_file_path
        echo "" >>$logtail_service_file_path
        echo "[Service]" >>$logtail_service_file_path
        echo "Type=oneshot" >>$logtail_service_file_path
        echo "User=$RUNUSER" >>$logtail_service_file_path
        echo "RemainAfterExit=yes" >>$logtail_service_file_path
        echo "ExecStart=systemctl start $SYSTEMD_SERVICE_NAME" >>$logtail_service_file_path
        echo "ExecStop=systemctl stop $SYSTEMD_SERVICE_NAME" >>$logtail_service_file_path
        echo "" >>$logtail_service_file_path
        echo "[Install]" >>$logtail_service_file_path
        echo "WantedBy=default.target" >>$logtail_service_file_path
        systemctl enable $LOGTAIL_SYSTEMD_SERVICE_NAME
    else
        rm -f $service_file_path
    fi
}

copy_files() {
    local binary_version=$(ls $CURRENT_DIR/loongcollector-linux64/bin/loongcollector_* | awk -F"_" '{print $NF}')
    cp $CURRENT_DIR/loongcollector-linux64/bin/loongcollector_$binary_version $BIN_DIR/
    cp $CURRENT_DIR/loongcollector-linux64/bin/libGoPluginAdapter.so $BIN_DIR/
    cp $CURRENT_DIR/loongcollector-linux64/bin/libGoPluginBase.so $BIN_DIR/
    [ -f $CURRENT_DIR/loongcollector-linux64/bin/libeBPFDriver.so ] && cp $CURRENT_DIR/loongcollector-linux64/bin/libeBPFDriver.so $BIN_DIR/
    [ -f $CURRENT_DIR/loongcollector-linux64/bin/libcoolbpf.so.1.0.0 ] && cp $CURRENT_DIR/loongcollector-linux64/bin/libcoolbpf.so.1.0.0 $BIN_DIR/
    [ -f $CURRENT_DIR/loongcollector-linux64/bin/libdcgm.so ] && cp $CURRENT_DIR/loongcollector-linux64/bin/libdcgm.so $BIN_DIR/

    if [ "$EBPF" = "auto" ]; then
        if [ "$USE_LOCAL_PACKAGE" = "true" ]; then
            EBPF="false"
            echo "Skip eBPF enviroment preparation in local package mode."
        else
            get_sysom_bucket
            if [ $? -eq 0 ]; then
                EBPF="true"
            else
                EBPF="false"
                echo "Skip eBPF enviroment preparation in unsupported region."
            fi
        fi
    fi
    if [ "$EBPF" = "true" ]; then
        echo "Preparing eBPF enviroment ..."
        check_or_prepare_vmlinux
        if [ $? -ne 0 ]; then
            EBPF_PREPARE_FAILED=true
            echo "Warning: eBPF environment preparation failed, but installation will continue..."
        else
            [ -f $CURRENT_DIR/loongcollector-linux64/bin/libeBPFDriver.so ] && cp $CURRENT_DIR/loongcollector-linux64/bin/libeBPFDriver.so $BIN_DIR/
            [ -f $CURRENT_DIR/loongcollector-linux64/bin/libcoolbpf.so.1.0.0 ] && cp $CURRENT_DIR/loongcollector-linux64/bin/libcoolbpf.so.1.0.0 $BIN_DIR/
            echo "Prepare eBPF enviroment successfully"
        fi
    fi

    ln -sf $BIN_DIR/loongcollector_$binary_version $BIN_DIR/loongcollector
    cp $CURRENT_DIR/loongcollector-linux64/$README_FILE $BIN_DIR/
    cp $CURRENT_DIR/loongcollector-linux64/resources/$CA_CERT_FILE $BIN_DIR/
    cp $CURRENT_DIR/loongcollector-linux64/bin/loongcollectord $CONTROLLER_DIR/$CONTROLLER_FILE
    cp $CURRENT_DIR/loongcollector-linux64/bin/ilogtaild $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE
}

update_permissions() {
    chmod 755 $BIN_DIR -R
    chown $RUNUSER $BIN_DIR -R
    chgrp $RUNUSER $BIN_DIR -R
    chmod 755 $CONTROLLER_DIR/$CONTROLLER_FILE
    chown $RUNUSER $CONTROLLER_DIR/$CONTROLLER_FILE
    chgrp $RUNUSER $CONTROLLER_DIR/$CONTROLLER_FILE
    chmod 755 $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE
    chown $RUNUSER $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE
    chgrp $RUNUSER $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE
}

# Upgrade loongcollector according to local information.
do_upgrade() {
    local bin_file
    if [ -f "$BIN_DIR/loongcollector" ]; then
        bin_file="loongcollector"
    else
        bin_file="ilogtail"
    fi

    if [ "$FORCE_UPGRADE" = "true" ]; then
        echo "Force upgrade loongcollector."
        
    else
        echo "Checking loongcollector status..."
        # Some necessary checks.
        $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE status
        if [ $? -ne 0 ]; then
            logError "$bin_file status is not ok, stop upgrading loongcollector"
            exit 1
        fi
    fi
    
    CONFIG_FILE_PATH=$BIN_DIR/$CONFIG_FILE
    if [ ! -f $CONFIG_FILE_PATH ]; then
        logError "Can not find config file: $CONFIG_FILE_PATH"
        exit 1
    fi
    if [ ! -f "$BIN_DIR/loongcollector" ] && [ ! -f "$BIN_DIR/ilogtail" ]; then
        logError "Can not find $BIN_DIR/loongcollector or $BIN_DIR/ilogtail binary"
        exit 1
    fi

    if [ "$USE_LOCAL_PACKAGE" = "false" ]; then
        # Download latest package according to install param.
        install_param=$(get_install_param_from_config_file $CONFIG_FILE_PATH)
        if [ $? -ne 0 ]; then
            if [ -n "$install_param" ]; then
                logError "Can not upgrade for loongcollector with config like $install_param"
            else
                logError "Can not get install_param according to $CONFIG_FILE_PATH"
            fi
            exit 1
        fi
        REGION=$install_param
        normalize_region
        rm -f $PACKAGE_NAME
        echo "Downloading package from region $REGION ..."
        download_file $install_param
        if [ -f $PACKAGE_NAME ]; then
            echo "Download $PACKAGE_NAME successfully."
        else
            logError $PACKAGE_NAME" download fail, exit"
            exit 1
        fi
    else
        # Use local package.
        if [ ! -f $PACKAGE_NAME ]; then
            logError "Can not find local package $PACKAGE_NAME to upgrade"
            exit 1
        fi
    fi

    # Check if the latest loongcollector has already existed.
    current_binary_version=$(ls -lh $BIN_DIR/$bin_file | awk -F"_" '{print $NF}')
    tar -zxf $PACKAGE_NAME
    new_binary_version=$(ls $CURRENT_DIR/loongcollector-linux64/bin/loongcollector_* | awk -F"_" '{print $NF}')
    if [ "$new_binary_version" = "$current_binary_version" ]; then
        logError "Already up to date."
        rm -rf loongcollector-linux64
        rm -f $PACKAGE_NAME
        exit 0
    fi

    # Stop loongcollector and start upgrading.
    echo "Try to stop $bin_file ..."
    for ((i = 0; i < 3; i++)); do
        $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE stop
        if [ $? -eq 0 ]; then
            break
        fi
        if [ $i -ne 2 ]; then
            logError "Stop $bin_file failed, sleep 3 seconds and retry..."
            sleep 3
        else
            # try force-stop,  if success, then break
            if [ "$FORCE_UPGRADE" = "true" ]; then
                echo "Try to force-stop $bin_file ..."
                $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE force-stop
                if [ $? -eq 0 ]; then
                    break
                fi
            fi
            # if force-stop failed, then exit
            rm -rf loongcollector-linux64
            rm -f $PACKAGE_NAME
            sleep 3
            if [ -f $service_file_path ]; then
                systemctl restart $SYSTEMD_SERVICE_NAME
            else
                $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE start
            fi
            logError "Stop $bin_file failed, exit"
            exit 1
        fi
    done
    echo "Stop $bin_file successfully."

    echo "Upgrading loongcollector in $BIN_DIR ..."
    # If dir of current version is not exist, create and backup.
    CURRENT_VERSION_DIR=$BIN_DIR/$current_binary_version
    if [ -n "$current_binary_version" ] && [ ! -d $CURRENT_VERSION_DIR ]; then
        mkdir -p $CURRENT_VERSION_DIR
        [ -f $BIN_DIR/libPluginAdapter.so ] && cp $BIN_DIR/libPluginAdapter.so $CURRENT_VERSION_DIR/
        [ -f $BIN_DIR/libPluginBase.so ] && cp $BIN_DIR/libPluginBase.so $CURRENT_VERSION_DIR/
        [ -f $BIN_DIR/libGoPluginAdapter.so ] && cp $BIN_DIR/libGoPluginAdapter.so $CURRENT_VERSION_DIR/
        [ -f $BIN_DIR/libGoPluginBase.so ] && cp $BIN_DIR/libGoPluginBase.so $CURRENT_VERSION_DIR/
        [ -f $BIN_DIR/libeBPFDriver.so ] && cp $BIN_DIR/libeBPFDriver.so $CURRENT_VERSION_DIR/
        [ -f $BIN_DIR/libcoolbpf.so.1.0.0 ] && cp $BIN_DIR/libcoolbpf.so.1.0.0 $CURRENT_VERSION_DIR/
    fi
    mkdir -p $LOGTAIL_SYS_CONF_DIR/checkpoint
    if [ ! -z "$INSTANCE_IDENTITY" ] && [ -n "$(echo $INSTANCE_IDENTITY | grep 'instance-id')" ]; then
        echo "$INSTANCE_IDENTITY" >"$LOGTAIL_SYS_CONF_DIR/checkpoint/instance_identity"
    fi
    # Create dir for new version.
    NEW_VERSION_DIR=$BIN_DIR/$new_binary_version
    mkdir -p $NEW_VERSION_DIR
    cp $CURRENT_DIR/loongcollector-linux64/bin/libGoPluginAdapter.so $NEW_VERSION_DIR/
    cp $CURRENT_DIR/loongcollector-linux64/bin/libGoPluginBase.so $NEW_VERSION_DIR/
    [ -f $CURRENT_DIR/loongcollector-linux64/bin/libeBPFDriver.so ] && cp $CURRENT_DIR/loongcollector-linux64/bin/libeBPFDriver.so $NEW_VERSION_DIR/
    [ -f $CURRENT_DIR/loongcollector-linux64/bin/libcoolbpf.so.1.0.0 ] && cp $CURRENT_DIR/loongcollector-linux64/bin/libcoolbpf.so.1.0.0 $NEW_VERSION_DIR/

    # Override current version.
    copy_files
    update_permissions

    # Add host monitor configuration if enabled
    add_hostmonitor_config "$BIN_DIR/$CONFIG_FILE"

    # INSTANCE_SUFFIX is set, update loongcollectord.
    if [ ! -z ${INSTANCE_SUFFIX+x} ]; then
        injectInstanceSuffix
    fi
    systemctl --version &>/dev/null
    if [ $? -eq 0 ] && [ -d "$SYSTEMD_SERVICE_DIR" ] && [ -f "$service_file_path" ] && ! cat "$service_file_path" | grep "LoongCollector"; then
        createSystemdFile
    fi
    echo "Upgrade loongcollector files successfully."

    # Start loongcollector, print the latest info.
    echo "Starting loongcollector ..."
    if [ -f $service_file_path ]; then
        systemctl restart $SYSTEMD_SERVICE_NAME
    else
        $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE start
    fi
    if [ $? -eq 0 ]; then
        echo "Upgrade loongcollector successfully."
    else
        logError "Start loongcollector fail, you'd better reinstall loongcollector."
        rm -rf loongcollector-linux64
        rm -f $PACKAGE_NAME
        exit 1
    fi
    sleep 3
    local appinfo=$BIN_DIR"/app_info.json"
    if [ -f $appinfo ]; then
        cat $appinfo
    fi
    rm -rf loongcollector-linux64
    rm -f $PACKAGE_NAME
    if [ "$EBPF_PREPARE_FAILED" = true ]; then
        logWarning "Unable to prepare eBPF runtime environment. eBPF features will not be available."
    fi
}

do_install_agent() {
    REGION=$1
    normalize_region
    local agent=$2
    echo "Start to install agent $agent from $REGION"

    update_package_address $REGION
    local package_name="${agent}.tar.gz"
    local package_address
    package_address=$(build_package_address "$PACKAGE_REGION_ADDRESS/${agent}" "$package_name")
    download $package_address $package_name
    if [ $? != 0 ]; then
        logError "Download $package_name from $package_address failed."
        logError "Can not find available package address for region {$REGION}."
        logError "Please confirm the region you specified and try again."
        rm -f $package_name
        exit 1
    fi

    local destination_dir="$LOGTAIL_SYS_CONF_DIR/$agent"
    if [ -d ${destination_dir} ]; then
        rm -rf "${destination_dir}.bak"
        mv ${destination_dir} "${destination_dir}.bak"
    fi
    tar -zxf $package_name
    rm -f $package_name
    cp -rf $agent $destination_dir
    rm -rf $agent
    chmod +x "$destination_dir/${agent}" &>/dev/null
    chmod +x "$destination_dir/${agent}d" &>/dev/null

    echo "Install agent $agent successfully"
}

do_install_agent_stub() {
    local agent=$1
    local agent_dir="$LOGTAIL_SYS_CONF_DIR/$agent"
    if [ ! -d $agent_dir ]; then
        mkdir -p $agent_dir
    fi
    local region=$REGION
    local script_path="$agent_dir/install.sh"
    local name="loongcollector_install_${agent}.sh"
    cp $CURRENT_DIR/"$(basename "$0")" $agent_dir/loongcollector.sh
    chmod +x "$agent_dir/loongcollector.sh"
    echo "#!/bin/bash" >$script_path
    echo "" >>$script_path
    echo "cp $agent_dir/loongcollector.sh /tmp/$name" >>$script_path
    echo "chmod +x /tmp/$name" >>$script_path
    echo "/tmp/$name install-agent $region $agent -s $INSTANCE_SUFFIX" >>$script_path
    echo "rm /tmp/$name" >>$script_path
    echo "agent stub for $agent has been installed"
    chmod +x $script_path
}

do_install() {
    echo RUNUSER:$RUNUSER
    REGION=$2
    normalize_region
    if [ "$USE_LOCAL_PACKAGE" = "false" ]; then
        rm -f $PACKAGE_NAME
        echo "Downloading package from region $REGION ..."
        download_file $2
        if [ -f $PACKAGE_NAME ]; then
            echo "Download $PACKAGE_NAME successfully."
        else
            logError $PACKAGE_NAME" download failed, exit"
            exit 1
        fi
    elif [ ! -f $PACKAGE_NAME ]; then
        logError "Can not find local package $PACKAGE_NAME to install"
        exit 1
    fi
    tar -zxf $PACKAGE_NAME
    local conf_file_path="${CURRENT_DIR}/loongcollector-linux64/conf/${REGION}/${CONFIG_FILE}"
    generate_default_config_file "$conf_file_path"
    echo "Generate config successfully."
    if [ ! -f ${conf_file_path} ]; then
        logError "Can not find specific config file ${conf_file_path}"
        rm -rf loongcollector-linux64
        rm -f $PACKAGE_NAME
        exit 1
    fi

    echo "Installing loongcollector in $BIN_DIR ..."
    mkdir -p $BIN_DIR
    mkdir -p $CONTROLLER_DIR
    copy_files
    cp $CURRENT_DIR/loongcollector-linux64/conf/$REGION"/"$CONFIG_FILE $BIN_DIR/$CONFIG_FILE
    
    # Add host monitor configuration if enabled
    add_hostmonitor_config "$BIN_DIR/$CONFIG_FILE"

    update_permissions

    mkdir -p $LOGTAIL_SYS_CONF_DIR/users
    if [ ! -z "$ALIUID" ]; then
        touch $LOGTAIL_SYS_CONF_DIR/users/$ALIUID
    fi
    mkdir -p $LOGTAIL_SYS_CONF_DIR/checkpoint
    if [ ! -z "$INSTANCE_IDENTITY" ] && [ -n "$(echo $INSTANCE_IDENTITY | grep 'instance-id')" ]; then
        echo "$INSTANCE_IDENTITY" >"$LOGTAIL_SYS_CONF_DIR/checkpoint/instance_identity"
    fi
    [ -e $LOGTAIL_SYS_CONF_DIR ] && chown -R $RUNUSER $LOGTAIL_SYS_CONF_DIR
    [ -e /tmp/logtail.sock ] && chown -R $RUNUSER /tmp/logtail.sock
    [ -e /tmp/logtail_check_point ] && chown -R $RUNUSER /tmp/logtail_check_point

    do_install_agent_stub telegraf
    do_install_agent_stub jvm

    # INSTANCE_SUFFIX is set, update ilogtail_config.json and ilogtaild.
    # add some suffix related parameters to ilogtail_config.json.
    # the first line of ilogtail_config.json must be '{'.
    if [ -n "$INSTANCE_SUFFIX" ]; then
        sed -i "1a\\    \"logtail_sys_conf_dir\":\"$LOGTAIL_SYS_CONF_DIR/\",\\n    \"check_point_filename\":\"/tmp/logtail_check_point$INSTANCE_SUFFIX\"," $BIN_DIR/$CONFIG_FILE
        injectInstanceSuffix
    fi
    echo "Install loongcollector files successfully."

    echo "Configuring loongcollector service ..."
    startup_status=""
    systemctl --version &>/dev/null
    if [ $? -eq 0 ] && [ -d "$SYSTEMD_SERVICE_DIR" ]; then
        createSystemdFile
    fi

    if [ "$startup_status" != "ok" ]; then
        if [ $1 = $ALIYUN_OS ] || [ $1 = $CENTOS_OS ] || [ $1 = $OPENSUSE_OS ]; then
            chkconfig --add $CONTROLLER_FILE
            chkconfig $CONTROLLER_FILE on
            echo "chkconfig add $CONTROLLER_FILE successfully."
        elif [ $1 = $DEBIAN_OS ] || [ $1 = $UBUNTU_OS ]; then
            update-rc.d $CONTROLLER_FILE start 55 2 3 4 5 . stop 45 0 1 6 .
            echo "update-rc.d add $CONTROLLER_FILE successfully."
        else
            ln -s $CONTROLLER_DIR/$CONTROLLER_FILE /etc/rc.d/rc0.d/K45$CONTROLLER_FILE
            ln -s $CONTROLLER_DIR/$CONTROLLER_FILE /etc/rc.d/rc1.d/K45$CONTROLLER_FILE
            ln -s $CONTROLLER_DIR/$CONTROLLER_FILE /etc/rc.d/rc2.d/S55$CONTROLLER_FILE
            ln -s $CONTROLLER_DIR/$CONTROLLER_FILE /etc/rc.d/rc3.d/S55$CONTROLLER_FILE
            ln -s $CONTROLLER_DIR/$CONTROLLER_FILE /etc/rc.d/rc4.d/S55$CONTROLLER_FILE
            ln -s $CONTROLLER_DIR/$CONTROLLER_FILE /etc/rc.d/rc5.d/S55$CONTROLLER_FILE
            ln -s $CONTROLLER_DIR/$CONTROLLER_FILE /etc/rc.d/rc6.d/K45$CONTROLLER_FILE
            echo "add loongcollector into /etc/rc.d/ successfully."
        fi
    fi
    echo "Configure loongcollector successfully."

    echo "Starting loongcollector ..."
    if [ -f $service_file_path ]; then
        systemctl restart $SYSTEMD_SERVICE_NAME
    else
        $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE start
    fi
    if [ $? -eq 0 ]; then
        echo "Start loongcollector successfully."
    else
        logError "Start loongcollector failed."
        rm -rf loongcollector-linux64
        rm -f $PACKAGE_NAME
        exit 1
    fi

    sleep 3
    local appinfo=$BIN_DIR"/app_info.json"
    if [ -f $appinfo ]; then
        cat $appinfo
    fi
    rm -rf loongcollector-linux64
    rm -f $PACKAGE_NAME
    if [ "$EBPF_PREPARE_FAILED" = true ]; then
        logWarning "Unable to prepare eBPF runtime environment. eBPF features will not be available."
    fi
}

do_uninstall() {
    if [ -f $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE ]; then
        $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE stop
        if [ $? -eq 0 ]; then
            echo "Stop loongcollector successfully."
        else
            logError "Stop loongcollector failed."
        fi
    fi

    if [ -f $service_file_path ]; then
        systemctl disable $LOGTAIL_SYSTEMD_SERVICE_NAME
        rm -f $LOGTAIL_SYSTEMD_SERVICE_NAME
        systemctl disable $SYSTEMD_SERVICE_NAME
        rm -f $service_file_path
        rm -f $logtail_service_file_path
        echo "systemd delete $CONTROLLER_FILE successfully."
    fi

    if [ $1 = $ALIYUN_OS ] || [ $1 = $CENTOS_OS ] || [ $1 = $OPENSUSE_OS ]; then
        chkconfig $CONTROLLER_FILE off 2>/dev/null
        chkconfig --del $CONTROLLER_FILE 2>/dev/null
        chkconfig $LOGTAIL_CONTROLLER_FILE off 2>/dev/null
        chkconfig --del $LOGTAIL_CONTROLLER_FILE 2>/dev/null
        echo "chkconfig del $CONTROLLER_FILE successfully."
    elif [ $1 = $DEBIAN_OS ] || [ $1 = $UBUNTU_OS ]; then
        update-rc.d -f $CONTROLLER_FILE remove
        update-rc.d -f $LOGTAIL_CONTROLLER_FILE remove
        echo "update-rc.d del $CONTROLLER_FILE successfully."
    else
        if [ -f /etc/rc.d/rc0.d/K45$CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc0.d/K45$CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc1.d/K45$CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc1.d/K45$CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc2.d/S55$CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc2.d/S55$CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc3.d/S55$CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc3.d/S55$CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc4.d/S55$CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc4.d/S55$CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc5.d/S55$CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc5.d/S55$CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc6.d/K45$CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc6.d/K45$CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc0.d/K45$LOGTAIL_CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc0.d/K45$LOGTAIL_CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc1.d/K45$LOGTAIL_CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc1.d/K45$LOGTAIL_CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc2.d/S55$LOGTAIL_CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc2.d/S55$LOGTAIL_CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc3.d/S55$LOGTAIL_CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc3.d/S55$LOGTAIL_CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc4.d/S55$LOGTAIL_CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc4.d/S55$LOGTAIL_CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc5.d/S55$LOGTAIL_CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc5.d/S55$LOGTAIL_CONTROLLER_FILE
        fi
        if [ -f /etc/rc.d/rc6.d/K45$LOGTAIL_CONTROLLER_FILE ]; then
            unlink /etc/rc.d/rc6.d/K45$LOGTAIL_CONTROLLER_FILE
        fi
        echo "del $CONTROLLER_FILE from /etc/rc.d/ successfully."
    fi

    if [ -d $BIN_DIR ] || [ -f $BIN_DIR ]; then
        rm -rf $BIN_DIR
    fi
    if [ -f $CONTROLLER_DIR/$CONTROLLER_FILE ]; then
        rm -f $CONTROLLER_DIR/$CONTROLLER_FILE
    fi
    if [ -f $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE ]; then
        rm -f $CONTROLLER_DIR/$LOGTAIL_CONTROLLER_FILE
    fi
    echo "Uninstall loongcollector successfully."
}

check_arch() {
    if [ x"$ARCH" = x ]; then
        echo "Can not get arch with uname -i!"
        exit
    fi
    case $ARCH in
    'x86_64')
        echo
        ;;
    'aarch64')
        echo
        ;;
    *)
        echo "Arch:$ARCH not supported, exit"
        exit 1
        ;;
    esac
    echo -e "OS Arch:\t"$ARCH
}

get_os_version() {
    if [ "$(echo $OS_ISSUE | grep debian | wc -l)" -ge 1 ]; then
        OS_VERSION=$DEBIAN_OS
    elif [ "$(echo $OS_ISSUE | grep ubuntu | wc -l)" -ge 1 ]; then
        OS_VERSION=$UBUNTU_OS
    elif [ "$(echo $OS_ISSUE | grep centos | wc -l)" -ge 1 ]; then
        OS_VERSION=$CENTOS_OS
    elif [ "$(echo $OS_ISSUE | grep 'red hat' | wc -l)" -ge 1 ]; then
        OS_VERSION=$CENTOS_OS
    elif [ "$(echo $OS_ISSUE | grep aliyun | wc -l)" -ge 1 ]; then
        OS_VERSION=$ALIYUN_OS
    elif [ "$(echo $OS_ISSUE | grep opensuse | wc -l)" -ge 1 ]; then
        OS_VERSION=$OPENSUSE_OS
    fi
}

check_os_version() {
    get_os_version
    if [ $OS_VERSION = $OTHER_OS ]; then
        # echo -e "Can not get os version from /etc/issue, try lsb_release"
        OS_ISSUE=$(lsb_release -a 2>/dev/null)
        get_os_version
    fi

    if [ $OS_VERSION = $OTHER_OS ]; then
        # echo -e "Can not get os version from lsb_release, try check specific files"
        if [ -f "/etc/redhat-release" ]; then
            OS_VERSION=$CENTOS_OS
        elif [ -f "/etc/debian_version" ]; then
            OS_VERSION=$DEBIAN_OS
        elif command -v chkconfig &>/dev/null; then
            OS_VERSION=$CENTOS_OS
        elif command -v update-rc.d &>/dev/null; then
            OS_VERSION=$DEBIAN_OS
        else
            logError "Can not get os verison"
        fi
    fi
    echo -e "OS Distribution:\t"$OS_VERSION
}

# meet_main, meet_compat, not_meet
check_env_result="not_meet"

check_cpu_flags_and_glibc() {
    local cpu_flags_meet=true
    case $ARCH in
    'x86_64')
        CPU_CAPABILITIES=$(cat /proc/cpuinfo | grep flags | head -n 1 | awk '{print tolower($0)}')
        if [[ ! "$CPU_CAPABILITIES" =~ "sse4_2" || ! "$CPU_CAPABILITIES" =~ "avx" ]]; then
            echo "The currently recognized CPU architecture is x86_64. The minimum requirement for Logtail to run full function is to support the sse4_2 and avx instruction set. The current CPU cannot meet the requirements."
            cpu_flags_meet=false
        fi
        ;;
    'aarch64')
        CPU_CAPABILITIES=$(cat /proc/cpuinfo | grep Features | head -n 1 | awk '{print tolower($0)}')
        if [[ ! "$CPU_CAPABILITIES" =~ "asimddp" ]] || [[ ! "$CPU_CAPABILITIES" =~ "asimdhp" ]]; then
            echo "The currently recognized CPU architecture is aarch64. The minimum requirement for Logtail to run full function is the ARMv8.2-A structure. The current CPU cannot meet the requirements."
            cpu_flags_meet=false
        fi
        ;;
    *)
        echo "Arch:$ARCH not supported, exit"
        check_env_result="not_meet"
        exit 1
        ;;
    esac

    # get glibc version
    glibc_version=$(ldd --version | head -n1 | awk '{print $NF}')
    echo "current glibc version is : $glibc_version"
    # split version
    IFS='.' read -ra VERSION_PARTS <<<"$glibc_version"
    major=${VERSION_PARTS[0]}
    minor=${VERSION_PARTS[1]}
    # compare version
    if [[ $major -gt 2 ]] || { [[ $major -eq 2 ]] && [[ $minor -ge 12 ]]; }; then
        if [ "$cpu_flags_meet" = "true" ]; then
            echo "glibc >= 2.12, and cpu flag meet"
            check_env_result="meet_main"
        else
            echo "glibc >= 2.12, but cpu flag not meet"
            check_env_result="meet_compat"
        fi
    elif [[ $major -eq 2 && $minor -ge 6 ]]; then
        echo "glibc >= 2.6, and glibc < 2.12"
        check_env_result="meet_compat"
    elif [[ $major -eq 2 && $minor -eq 5 ]]; then
        echo "The minimum glibc version requirement for LoongCollector to run is 2.6. The current glibc version $glibc_version cannot meet the requirements. Could try install Logtail 1.X.X version"
        check_env_result="not_meet"
    else
        echo "The current glibc version $glibc_version cannot meet the requirements for Logtail or LoongCOllector, and therefore exits."
        check_env_result="not_meet"
    fi
}

target_version_compat=false

check_target_version() {
    if [ -n "$VERSION" ] && [[ "$VERSION" =~ (.*)-compat$ ]]; then
        VERSION=${BASH_REMATCH[1]}
        target_version_compat=true
    else
        target_version_compat=false
    fi
}

print_help() {
    echo "Usage:"
    echo -e "\tloongcollector.sh [install <REGION> [user]]  [uninstall]  [install-local <REGION>]  [upgrade] [upgrade-local <REGION>]"
    echo "Parameter:"
    echo -e "\t<REGION>:"
    echo -e "\t(for all ECS VM in VPC) you can use 'auto' to ask loongcollector.sh decide your region automatically (./loongcollector.sh install auto)."
    echo -e "\t(for ECS VM if 'auto' not work) $CN_BEIJING $CN_QINGDAO $CN_SHANGHAI $CN_HANGZHOU $CN_SHENZHEN $AP_NORTHEAST_1 $EU_CENTRAL_1 $ME_EAST_1 $US_WEST_1, etc (./loongcollector.sh install $CN_BEIJING)."
    echo -e "\t(for Non-ECS VM or other IDC) $CN_BEIJING_INTERNET $CN_QINGDAO_INTERNET $CN_SHANGHAI_INTERNET $CN_HANGZHOU_INTERNET $CN_SHENZHEN_INTERNET $AP_NORTHEAST_1_INTERNET $EU_CENTRAL_1_INTERNET $ME_EAST_1_INTERNET $US_WEST_1_INTERNET, etc."
    echo -e "\t(for ECS VM in Finance) $CN_HANGZHOU_FINANCE $CN_HANGZHOU_FINANCE_INTERNET $CN_SHANGHAI_FINANCE $CN_SHANGHAI_FINANCE_INTERNET $CN_SHENZHEN_FINANCE $CN_SHENZHEN_FINANCE_INTERNET."
    echo -e "\t(for Machine inner Alibaba Group) $CN_BEIJING_INNER $CN_QINGDAO_INNER $CN_SHANGHAI_INNER $CN_HANGZHOU_INNER $CN_SHENZHEN_INNER $AP_NORTHEAST_1_INNER $EU_CENTRAL_1_INNER $ME_EAST_1_INNER $US_WEST_1_INNER, etc."
    echo -e "\t(for Global Acceleration) $CN_BEIJING_ACCELERATION $CN_QINGDAO_ACCELERATION $CN_SHANGHAI_ACCELERATION $CN_HANGZHOU_ACCELERATION $CN_SHENZHEN_ACCELERATION $AP_NORTHEAST_1_ACCELERATION $EU_CENTRAL_1_ACCELERATION $ME_EAST_1_ACCELERATION $US_WEST_1_ACCELERATION, etc."
    echo "Commands:"
    echo -e "\tinstall $CN_BEIJING:\t (recommend) auto download package, install loongcollector to /usr/local/ilogtail, for $CN_BEIJING region"
    echo -e "\tuninstall:\t uninstall loongcollector from /usr/local/ilogtail"
    echo -e "\tupgrade:\t upgrade loongcollector to latest version"
    echo -e "\tinstall-agent $CN_BEIJING telegraf"
    echo "Options:"
    echo -e "\t-v <version>: specify loongcollector version to install or upgrade, eg. ./loongcollector.sh install cn-hangzhou -v 3.0.12"
    echo -e "\t-enable-ebpf <true|false>: enforce to or not to prepare eBPF environment, eg. ./loongcollector.sh install-local cn-hangzhou -enable-ebpf true"
    echo -e "\t-enable-hostmonitor: enable basic host monitor in configuration, eg. ./loongcollector.sh install cn-hangzhou -enable-hostmonitor true"
}

# 如果脚本被 source 加载（用于测试），则跳过主逻辑执行
if [ "$_IS_SOURCED" = "true" ]; then
    return 0 2>/dev/null || true  # return 用于 source，true 用于直接执行
fi

echo "loongcollector.sh version: "$INSTALLER_VERSION

# Check whether the environment meets expectations
check_arch
check_os_version

argc=$#
# -s <instance_suffix> -v <version>
for ((i = 1; i <= "$#"; i++)); do
    if [ "${!i}" = "-s" ] && [ "$i" -lt "$#" ]; then
        i=$((i + 1))
        INSTANCE_SUFFIX=${!i}
        argc=$((argc - 2))
    elif [ "${!i}" = "-v" ] && [ "$i" -lt "$#" ]; then
        i=$((i + 1))
        VERSION=${!i}
        echo "loongcollector version is specified: $VERSION"
        argc=$((argc - 2))
    elif [ "${!i}" = "-u" ] && [ "$i" -lt "$#" ]; then
        i=$((i + 1))
        RUNUSER=${!i}
        argc=$((argc - 2))
    elif [ "${!i}" = "-enable-ebpf" ] && [ "$i" -lt "$#" ]; then
        i=$((i + 1))
        EBPF=${!i}
        argc=$((argc - 2))
    elif [ "${!i}" = "-enable-hostmonitor" ] && [ "$i" -lt "$#" ]; then
        i=$((i + 1))
        ENABLE_HOST_MONITOR=${!i}
        argc=$((argc - 2))
    fi
done

check_target_version
check_cpu_flags_and_glibc

if [ "$check_env_result" = "meet_main" ]; then
    FUNCTION_TYPE="main"
    if [ "$target_version_compat" = "true" ]; then
        FUNCTION_TYPE="compat"
    fi
elif [ "$check_env_result" = "meet_compat" ]; then
    FUNCTION_TYPE="compat"
else
    echo "cpu or glibc not meet the minimum requirement, so exit"
    exit 1
fi

# INSTANCE_SUFFIX is set, update BIN_DIR and CONTROLLER_FILE
if [ ! -z "${INSTANCE_SUFFIX+x}" ]; then
    BIN_DIR="$BIN_DIR$INSTANCE_SUFFIX"
    CONTROLLER_FILE="$CONTROLLER_FILE$INSTANCE_SUFFIX"
    SYSTEMD_SERVICE_NAME="${CONTROLLER_FILE}.service"
    LOGTAIL_CONTROLLER_FILE="$LOGTAIL_CONTROLLER_FILE$INSTANCE_SUFFIX"
    LOGTAIL_SYSTEMD_SERVICE_NAME="${LOGTAIL_CONTROLLER_FILE}.service"
    LOGTAIL_SYS_CONF_DIR="$LOGTAIL_SYS_CONF_DIR$INSTANCE_SUFFIX"
    echo "instance suffix ($INSTANCE_SUFFIX) is specified, update BIN_DIR and CONTROLLER_FILE"
fi

service_file_path="$SYSTEMD_SERVICE_DIR/$SYSTEMD_SERVICE_NAME"
logtail_service_file_path="$SYSTEMD_SERVICE_DIR/$LOGTAIL_SYSTEMD_SERVICE_NAME"
echo "BIN_DIR: $BIN_DIR"
echo "CONTROLLER_FILE: $CONTROLLER_FILE"

case $argc in
0)
    print_help
    exit 1
    ;;
1)
    case $1 in
    uninstall)
        do_uninstall $OS_VERSION
        ;;
    upgrade)
        do_upgrade
        ;;
    force-upgrade)
        FORCE_UPGRADE="true"
        do_upgrade
        ;;
    upgrade-local)
        USE_LOCAL_PACKAGE="true"
        do_upgrade
        ;;
    force-upgrade-local)
        USE_LOCAL_PACKAGE="true"
        FORCE_UPGRADE="true"
        do_upgrade
        ;;
    *)
        print_help
        exit 1
        ;;
    esac
    ;;
2)
    if [ $1 = "install-local" ]; then
        USE_LOCAL_PACKAGE="true"
    fi
    if [ $1 = "install" ] || [ $1 = "install-local" ]; then
        do_uninstall $OS_VERSION
        do_install $OS_VERSION $2 $1
    else
        print_help
        exit 1
    fi

    ;;
3)
    if [ $1 == "install-agent" ]; then
        do_install_agent $2 $3
    else
        print_help
        exit 1
    fi
    ;;
*)
    print_help
    exit 1
    ;;
esac

exit 0
